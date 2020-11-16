import { TerrainType } from '../enums/terrain-type';
import { Tile } from '../models/map/Tile';
import { TabernRate } from '../models/rates/TabernRate';

export class TileBalancer {
  private tiles: Tile[];
  private tabernCount: any;

  constructor (
  ) {
    this.tiles = [];
    this.tabernCount = {};
  }

  safeAddNewTile(tile: Tile) {
    const checkResult = this._checkTaberns(tile);
    
    if(checkResult) {
      this.tiles.push(tile);
    }

    return checkResult;
  }

  private _checkTaberns(tile: Tile): boolean {
    const tabernRate = tile.findTabern();

    if(tabernRate !== undefined) {
      const values = Object.keys(this.tabernCount).map(index => {
        return this.tabernCount[index];
      });
  
      var maxTaberns = Math.max(...values);
      var currentTabernCount = this.tabernCount[tabernRate.type];

      var allEqual = values.every((val, i, arr) => val === arr[0]);

      if(
        (!allEqual && currentTabernCount < maxTaberns ||
        allEqual) ||  
        currentTabernCount === undefined
      ) {
        this.tabernCount[tabernRate.type] = currentTabernCount !== undefined ? currentTabernCount + 1 : 0;
        
        return true;
      }
  
      return false;
    }

    return true;
  }
}
