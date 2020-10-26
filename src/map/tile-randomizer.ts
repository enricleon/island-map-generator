import TERRAIN_COLORS from '../constants/colors';
import { TerrainType } from '../enums/terrain-type';
import ArrayHelper from '../helpers/array-helper';
import RandomHelper from '../helpers/random-helper';
import { PortRate } from '../models/PortRate';
import { Rate } from '../models/Rate'
import { SpaceNode } from '../models/SpaceNode';

const CONTENT_TREE = new Rate({
  value: 1,
  type: TerrainType.Water,
  contains: [
    new Rate({
    value: 0.31,
    type: TerrainType.Terrain,
    min: 1,
    max: 3,
    contains: [
      new Rate({
        value: 0.62,
        excludeSelf: true,
        min: 1,
        max: 2,
        type: TerrainType.Bonus,
        contains: [
          new Rate({
            value: 0.62,
            max: 1,
            excludeSelf: true,
            type: TerrainType.TerrainBonus,
            contains: [
              new Rate({
                value: 0.5,
                type: TerrainType.Tabern,
                excludeSelf: true,
                contains: [
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Cocinero,
                  }),
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Vigia,
                  }),
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Navegante,
                  }),
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Artillero,
                  }),
                ]
              }),
              new Rate({
                value: 0.5,
                type: TerrainType.Treasure,
              })
            ]
          }),
          new PortRate({
            value: 0.38
          }),
        ],
      }),
    ],
  })
]});

export class TileRandomizer {
  private _gridSize: number
  private _contentTree = CONTENT_TREE;
  private _log: string[];
  private _logEnabled: boolean;

  constructor(gridSize, enableLog?) {
    this._gridSize = gridSize
    this._log = [];
    this._logEnabled = enableLog;
  }

  getRandomTile(): TerrainType[] {
    this._log = [];
    const totalSpaces = this._gridSize * this._gridSize
    const result = this._processContentTree(totalSpaces, this._contentTree);
    const types = this._extractColorsFromTree(result);

    ArrayHelper.shuffleArray(types);

    // this._log.push(JSON.stringify(types));

    if(this._log.length && this._logEnabled) {
      alert(this._log.join('\n'));
    }

    // return result;
    return types;
  }

  _processContentTree(spaces, rate: Rate): SpaceNode {
    let contains = new Array<SpaceNode>();
    const ratesIncluded = rate.excludeSelf ? rate.contains : 
      [rate, ...rate.contains];

    // from the available spaces, of much are for childs?
    const results = ratesIncluded.reduce((distribution, rateIncluded) => {
      distribution[rateIncluded.type] = 0;
      return distribution;
    }, {});

    const childsProbability = rate.contains.reduce((sum, child) => sum + child.value, 0);
    const ownProbability = rate.value - (childsProbability * rate.value);

    let alreadyOccupiedNumSpaces = 0;
    
    rate.contains
      .filter(child => child.min !== undefined && child.min > 0)
      .forEach(child => {
        if((alreadyOccupiedNumSpaces + child.min) <= spaces) {
          alreadyOccupiedNumSpaces += child.min;
          results[child.type] += child.min;
        }
      });

    for(var i = 0; i < spaces - alreadyOccupiedNumSpaces; i++) {
      const options = rate.contains.filter(option => option.max === undefined || results[option.type] < option.max);
      const args = [{ value: ownProbability, type: rate.type }, ...options];
      const randomSpace = RandomHelper.getRandom<{ value: number, type: TerrainType }>(args, this._log);

      results[randomSpace.type]++;
    }

    // this._log.push(`Space ${i}: ${JSON.stringify(results)}`);

    contains = rate.contains.map((child) => {
      const numSpaces = results[child.type];
      
      return this._processContentTree(
        numSpaces,
        child
      );
    });

    return new SpaceNode({
      spaces: spaces,
      type: rate.type,
      excludeSelf: rate.excludeSelf,
      contains: contains
    });
  }

  _extractColorsFromTree(node: SpaceNode): TerrainType[] {
    const childTypes = new Array<TerrainType>();

    for(var i = 0; i < node.contains.length; i++) {
      childTypes.push(...this._extractColorsFromTree(node.contains[i]));
    }

    return node.excludeSelf ?
      childTypes :
      [...[...new Array(node.spaces - childTypes.length)].map(() => node.type), ...childTypes];
  }

  _getRandomValueFromRange(availableSpaces, { min, max }) {
    return Math.floor(availableSpaces * (Math.random() * (max - min) + min))
  }
}