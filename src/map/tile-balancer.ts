import { Tile } from '../models/map/Tile';
import { RATES } from '../constants/rates';
import { Rate } from '../models/rates/Rate';
import { TerrainType } from '../enums/terrain-type';

export class TileBalancer {
  private tiles: Tile[];
  private balancedRates: any;
  private _log: string[];
  private _logEnabled: boolean;

  constructor (
    logEnabled = false
  ) {
    this._logEnabled = logEnabled;
    this.tiles = [];
    this.balancedRates = {};

    this.resetLog();
  }

  resetLog() {
    this._log = [];
  }

  safeAddNewTile(tile: Tile) {
    const contentTree = RATES;

    this.resetLog();
    this._log.push('[');
    for(let i = 0; i < tile.spaces.length; i++) {
      this._log.push(`    ${TerrainType[tile.spaces[i].type]}`);
    }
    this._log.push(']');

    const checkResult = this._processNode(tile, contentTree);
    this._log.push(`Balanced: ${checkResult}`);

    if(checkResult) {
      this.tiles.push(tile);
    }

    if(this._log.length) {
      if(this._logEnabled) {
        alert(this._log.join('\n'));
      }
    }

    return checkResult;
  }

  private _printNode(result) {

  } 

  private _processNode(tile, rate) {
    let result = this._checkBalance(tile, rate);

    if(result && rate.contains) {
      for(let i = 0; i < rate.contains.length; i++) {
        result = result && this._processNode(tile, rate.contains[i]);
      }
    }
    
    return result;
  }

  private _checkBalance(tile: Tile, rate: Rate): boolean {
    let result = true;

    if(rate.balanced) {
      this._log.push(`Rate: ${TerrainType[rate.type]}`);
      this.balancedRates[rate.type] = this.balancedRates[rate.type] || {};

      this._log.push(`    Initial value: ${JSON.stringify(this.balancedRates[rate.type])}`);

      for(let i = 0; i < rate.contains.length; i++) {
        const childRate = rate.contains[i];
        this._log.push(`    Child Rate: ${TerrainType[childRate.type]}`);

        const hasCell = tile.hasCellOfType(childRate.type);
        this._log.push(`    Tile has cell: ${childRate.type}?`);

        if(hasCell) {
          this._log.push(`        Yes!`);
          const values = Object.keys(this.balancedRates[rate.type]).map(index => {
            return this.balancedRates[rate.type][index];
          })

          this._log.push(`        Initial value: ${JSON.stringify(values)}`);

          var maxCellsOfRate = values.length ? Math.max(...values) : 1;
          var currentCount = this.balancedRates[rate.type][childRate.type] || 0;
    
          const firstBonusCount = this.balancedRates[rate.type][Object.keys(this.balancedRates[rate.type])[0]];
          var allEqual = rate.contains.every(child => this.balancedRates[rate.type][child.type] === firstBonusCount);
    
          this._log.push(`        Max cells of rate: ${maxCellsOfRate}`);
          this._log.push(`        Current count: ${currentCount}`);
          this._log.push(`        All equal: ${allEqual}`);

          if(
            (currentCount < maxCellsOfRate) || 
            allEqual || 
            currentCount === undefined
          ) {
            this.balancedRates[rate.type][childRate.type] = currentCount !== undefined ? currentCount + 1 : 1;
          } else {
            result = false;
          }
        } else {
          this._log.push(`        No`);
        }
      }
    }

    return result;
  }
}
