import { TerrainType } from '../enums/terrain-type';
import ArrayHelper from '../helpers/array-helper';
import RandomHelper from '../helpers/random-helper';
import { RandomizerConfig } from '../models/map/RandomizerConfig';
import { SpaceNode } from '../models/map/SpaceNode';
import { TerrainNode } from '../models/map/TerrainNode';
import { Tile } from '../models/map/Tile';
import { Rate } from '../models/rates/Rate';
import { TileBalancer } from './tile-balancer';

export class TileRandomizer {
  private _log: string[];
  private _gridSize: number;
  private _logEnabled?: boolean;
  private _contentTree: Rate;

  private _balancer: TileBalancer;

  constructor(config: RandomizerConfig, balancer?) {
    this._balancer = balancer;

    this._gridSize = config.gridSize;
    this._logEnabled = config.logEnabled;
    this._contentTree = config.contentTree;

    this._log = [];
  }

  getRandomTile(): Tile {
    let tile;

    do {
      tile = new Tile({
        spaces: this._generateTileSpaces()
      })
    }
    while(
      this._balancer !== undefined && 
      !this._balancer.isValid(tile)
    );

    if(this._balancer !== undefined) {
      this._balancer.addNewTile(tile);
    }

    if(this._log.length && this._logEnabled) {
      alert(this._log.join('\n'));
    }

    return tile;
  }

  _generateTileSpaces(): TerrainNode[] {
    const result = this._processContentTree(
      this._gridSize * this._gridSize,
      this._contentTree
    );

    const types = this._extractColorsFromTree(result);

    ArrayHelper.shuffleArray(types);

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

    contains = rate.contains.map((child) => {
      const numSpaces = results[child.type];
      
      return this._processContentTree(
        numSpaces,
        child
      );
    });

    return new SpaceNode({
      rate: rate,
      spaces: spaces,
      type: rate.type,
      excludeSelf: rate.excludeSelf,
      contains: contains
    });
  }

  _extractColorsFromTree(node: SpaceNode): TerrainNode[] {
    const childTypes = new Array<TerrainNode>();

    for(var i = 0; i < node.contains.length; i++) {
      childTypes.push(...this._extractColorsFromTree(node.contains[i]));
    }

    return node.excludeSelf ?
      childTypes :
      [...[...new Array(node.spaces - childTypes.length)].map(() => 
        new TerrainNode({
          type: node.type,
          rate: node.rate
        })
      ), ...childTypes];
  }

  _getRandomValueFromRange(availableSpaces, { min, max }) {
    return Math.floor(availableSpaces * (Math.random() * (max - min) + min))
  }
}