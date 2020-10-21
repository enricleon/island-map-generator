import TERRAIN_COLORS from '../constants/colors';
import { TerrainType } from '../enums/terrain-type';
import ArrayHelper from '../helpers/array-helper';
import { Rate } from '../models/Rate'

const CONTENT_TREE = new Rate({
  value: 0.35,
  spread: 0.6,
  type: TerrainType.Terrain,
  contains: [
    new Rate({
      value: 1,
      spread: 0.3,
      transparent: true,
      type: TerrainType.Bonus,
      min: 1,
      contains: [
        new Rate({
          value: 0.3,
          spread: 0.35,
          type: TerrainType.Tabern,
        }),
        new Rate({
          value: 0.4,
          spread: 0.4,
          type: TerrainType.Treasure,
        }),
        new Rate({
          value: 0.4,
          spread: 0.2,
          type: TerrainType.Port,
        }),
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

  getRandomTile() {
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

  _processContentTree(totalSpaces, rate: Rate, min = 0) {
    const spaces = Math.max(min, this._getNumOfSpaces(totalSpaces, rate));

    const acc = [];

    for(var i = 0; i < rate.contains.length; i++) {
      const child = rate.contains[i];

      let occupiedSpaces = 0;

      for(var j = 0; j < acc.length; j++) {
        occupiedSpaces = occupiedSpaces + acc[j].spaces;
      }

      const availableSpaces = i - 1 >= 0 ? 
          spaces - occupiedSpaces : 
          spaces;

      const isLast = (i === rate.contains.length - 1)
      const min = isLast && occupiedSpaces < rate.min ? rate.min - occupiedSpaces : 0;

      const returnValue = this._processContentTree(
        availableSpaces, 
        child, 
        min
      );

      acc.push(returnValue);
    }

    return {
      rate: rate.name,
      spaces: spaces,
      type: rate.type,
      transparent: rate.transparent,
      contains: acc
    }
  }

  _extractColorsFromTree(node) {
    if(!node.contains || node.contains.length === 0) {
      const spaces = new Array(node.spaces);
      return spaces.map(() => node.type);
    } else {
      let contains = [];

      for(var i = 0; i < node.contains.length; i++) {
        let childNode = node.contains[i];
        const type = this._extractColorsFromTree(childNode);

        contains = contains.concat(type);
      }

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