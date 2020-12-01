import { Tile } from '../models/map/Tile';
import { RATES } from '../constants/rates';
import { Rate } from '../models/rates/Rate';

export class TileBalancer {
  private _numPlayers: number;
  private _tiles: Tile[];
  private _balancedRates: any;

  constructor (
    numPlayers = 6
  ) {
    this._numPlayers = numPlayers;
    this._tiles = [];
    this._balancedRates = {};
  }

  hasPendingTiles() {
    const contentTree = RATES;
    const checkResult = !this._processRate(contentTree, (rate) => {
      return this._checkRateCompleted(rate);
    });

    return checkResult;
  }

  safeAddNewTile(tile: Tile) {
    const contentTree = RATES;
    const checkResult = this._processRate(contentTree, (rate) => {
      return this._checkBalance(tile, rate) && 
            this._checkTileRateNotValid(tile, rate);
    });

    if(checkResult) {
      this._tiles.push(tile);
    }

    return checkResult;
  }

  private _processRate(rate, callback) {
    let result = callback(rate);

    if(result && rate.contains) {
      for(let i = 0; i < rate.contains.length; i++) {
        result = result && this._processRate(rate.contains[i], callback);
      }
    }
    
    return result;
  }

  private _checkTileRateNotValid(tile, rate) {
    const isRateCompleted = this._checkRateIsCompleted(rate);

    if(isRateCompleted && tile.hasCellOfType(rate.type)) {
      return false;
    }

    return true;
  }

  private _checkRateIsCompleted(rate: Rate) {
    if(rate.playerCount) {
      const count = rate.playerCount(this._numPlayers);
      const cellsOfType = this._tiles.reduce((sum, tile) => sum + tile.countCellsOfType(rate.type), 0);

      if(cellsOfType === count) {
        return true;
      }
    }

    return false;
  }

  private _checkRateCompleted(rate: Rate) {
    if(rate.playerCount) {
      const count = rate.playerCount(this._numPlayers);
      const cellsOfType = this._tiles.reduce((sum, tile) => sum + tile.countCellsOfType(rate.type), 0);

      if(cellsOfType < count) {
        return false;
      }
    }

    return true;
  }

  private _checkBalance(tile: Tile, rate: Rate): boolean {
    let result = true;

    if(rate.balanced) {
      this._balancedRates[rate.type] = this._balancedRates[rate.type] || {};

      for(let i = 0; i < rate.contains.length; i++) {
        const childRate = rate.contains[i];
        const hasCell = tile.hasCellOfType(childRate.type);

        if(hasCell) {
          const values = Object.keys(this._balancedRates[rate.type]).map(index => {
            return this._balancedRates[rate.type][index];
          })

          var maxCellsOfRate = values.length ? Math.max(...values) : 1;
          var currentCount = this._balancedRates[rate.type][childRate.type] || 0;
    
          const firstBonusCount = this._balancedRates[rate.type][Object.keys(this._balancedRates[rate.type])[0]];
          var allEqual = rate.contains.every(child => this._balancedRates[rate.type][child.type] === firstBonusCount);

          if(
            (currentCount < maxCellsOfRate) || 
            allEqual || 
            currentCount === undefined
          ) {
            this._balancedRates[rate.type][childRate.type] = currentCount !== undefined ? currentCount + 1 : 1;
          } else {
            result = false;
          }
        }
      }
    }

    return result;
  }
}
