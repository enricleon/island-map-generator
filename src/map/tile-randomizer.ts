import ArrayHelper from '../helpers/array-helper';

const RATES = {
  terrain: {
    rate: 0.3,
    spread: 0.75
  },
  bonus: {
    rate: 0.6,
    spread: 1,
    min: 1
  },
  treaseures: {
    rate: 0.5,
    spread: 1
  }
}

export class TileRandomizer {
  private _gridSize: number;

  constructor (gridSize) {
    this._gridSize = gridSize;
  }

  getRandomTile() {
    const totalSpaces = this._gridSize * this._gridSize;
    const terrainSpaces = this._getNumOfTerrainSpaces(totalSpaces);
    const bonusSpaces = this._getNumOfBonusTiles(terrainSpaces);
    const treasureSpaces = this._getNumOfTreasures(bonusSpaces);
    const villageSpaces = this._getNumOfVillages(bonusSpaces, treasureSpaces);

    const water = totalSpaces - terrainSpaces;

    const result:RGBColor[] = [];
    for (var i = 0; i < (terrainSpaces - bonusSpaces); i++) {
      var fillColor = new RGBColor()
      fillColor.red = 249
      fillColor.green = 236
      fillColor.blue = 195

      result.push(fillColor);
    }

    for (var i = 0; i < treasureSpaces; i++) {
      var fillColor = new RGBColor()
      fillColor.red = 163
      fillColor.green = 78
      fillColor.blue = 24

      result.push(fillColor);
    }

    for (var i = 0; i < villageSpaces; i++) {
      var fillColor = new RGBColor()
      fillColor.red = 229
      fillColor.green = 205
      fillColor.blue = 165

      result.push(fillColor);
    }

    for (var i = 0; i < water; i++) {
      var fillColor = new RGBColor()
      fillColor.red = 34
      fillColor.green = 108
      fillColor.blue = 168

      result.push(fillColor);
    }

    ArrayHelper.shuffleArray(result);

    return result;
  }

  _getNumOfTerrainSpaces(tileSpaces: number) {
    const terrainRate = RATES.terrain.rate;
    const spread = RATES.terrain.spread;
    const modifier = terrainRate * spread;

    const max = terrainRate + modifier;
    const min = terrainRate - modifier;

    return Math.floor(tileSpaces * (Math.random() * (max - min) + min));
  }

  _getNumOfBonusTiles(terrainSpaces: number) {
    const bonusSpaces = RATES.bonus.rate;
    const spread = RATES.bonus.spread;
    const modifier = bonusSpaces * spread;
    const terrainMin = Math.min(RATES.bonus.min, terrainSpaces);

    const max = bonusSpaces + modifier;
    const min = bonusSpaces - modifier;

    const bonus = Math.floor(terrainSpaces * (Math.random() * (max - min) + min));
    return bonus < terrainMin ? terrainMin : bonus;
  }

  _getNumOfTreasures(bonusSpaces: number) {
    const treasureSpaces = RATES.treaseures.rate;
    const spread = RATES.treaseures.spread;
    const modifier = treasureSpaces * spread;

    const max = treasureSpaces + modifier;
    const min = treasureSpaces - modifier;

    return Math.floor(bonusSpaces * (Math.random() * (max - min) + min));
  }
  
  _getNumOfVillages(bonusSpaces: number, treasureSpaces: number) {
    return bonusSpaces - treasureSpaces;
  }
}