import TERRAIN_COLORS from '../constants/colors';
import { TerrainType } from '../enums/terrain-type';
import ArrayHelper from '../helpers/array-helper';
import { Rate } from '../models/Rate'
import { SpaceNode } from '../models/SpaceNode';

const CONTENT_TREE = new Rate({
  value: 0.75,
  spread: 0.25,
  type: TerrainType.Terrain,
  min: 1,
  contains: [
    new Rate({
      value: 0.75,
      spread: 0.5,
      transparent: true,
      type: TerrainType.Bonus,
      min: 1,
      contains: [
        new Rate({
          value: 0.5,
          spread: 0.25,
          transparent: true,
          type: TerrainType.TerrainBonus,
          contains: [
            new Rate({
              value: 0.5,
              spread: 0.25,
              type: TerrainType.Tabern,
            }),
            new Rate({
              value: 0.5,
              spread: 0.25,
              type: TerrainType.Port,
            }),
          ]
        }),
        new Rate({
          value: 0.5,
          spread: 0.2,
          type: TerrainType.Treasure,
        })
      ],
    }),
  ],
})

export class TileRandomizer {
  private _gridSize: number
  private _contentTree = CONTENT_TREE;

  constructor(gridSize) {
    this._gridSize = gridSize
  }

  getRandomTile(): TerrainType[] {
    const totalSpaces = this._gridSize * this._gridSize
    const result = this._processContentTree(totalSpaces, this._contentTree);
    const types = this._extractColorsFromTree(result);

    const water = totalSpaces - types.length;

    for (var i = 0; i < water; i++) {
      types.push(TerrainType.Water);
    }

    ArrayHelper.shuffleArray(types)

    // return result;
    return types.map(type => TERRAIN_COLORS[type]);
  }

  _processContentTree(totalSpaces, rate: Rate, min = 0): SpaceNode {
    const spaces = Math.max(min, this._getNumOfSpaces(totalSpaces, rate));

    const contentTree = rate.contains.reduce((nodes: SpaceNode[], child: Rate, index) => {
      let occupiedSpaces = nodes.reduce((sum, node) => sum + node.spaces, 0);

      const availableSpaces = index - 1 >= 0 ? 
          spaces - occupiedSpaces : 
          spaces;

      const isLast = (index === rate.contains.length - 1)
      const min = isLast && occupiedSpaces < rate.min ? rate.min - occupiedSpaces : 0;

      const returnValue = this._processContentTree(
        availableSpaces, 
        child, 
        min
      );

      alert(`
        ${TerrainType[returnValue.type].toString()}: ${returnValue.spaces}
      `);

      nodes.push(returnValue);

      return nodes;
    }, []);

    return new SpaceNode({
      spaces: spaces,
      type: rate.type,
      transparent: rate.transparent,
      contains: contentTree
    });
  }

  _extractColorsFromTree(node: SpaceNode): TerrainType[] {
    if(!node.contains || node.contains.length === 0) {
      return [...new Array(node.spaces)].map(() => node.type);
    } else {
      let contains = node.contains
        .reduce((acc, childNode) => [...acc, ...this._extractColorsFromTree(childNode)], []);

      if(!node.transparent) {
        const spaces = new Array(node.spaces - contains.length);
        spaces.forEach(() => {
          contains.push(node.type);
        });
      }

      return contains;
    }
  }

  _getNumOfSpaces(availableSpaces, rate: Rate) {
    const minMax = this._getMinMax(rate);

    const spaces = this._getRandomValueFromRange(
      availableSpaces,
      minMax
    )

    const availableMin =
      rate.min !== undefined
        ? Math.min(rate.min, availableSpaces)
        : 0;

    return spaces < availableMin ? availableMin : spaces
  }

  _getMinMax(rate: Rate) {
    const modifier = rate.value * rate.spread

    const max = rate.value + modifier
    const min = rate.value - modifier

    return { min, max }
  }

  _getRandomValueFromRange(availableSpaces, { min, max }) {
    return Math.floor(availableSpaces * (Math.random() * (max - min) + min))
  }
}