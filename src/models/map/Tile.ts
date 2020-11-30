import { TerrainType } from '../../enums/terrain-type';
import { Rate } from '../rates/Rate';
import { TerrainNode } from './TerrainNode';

export class Tile {
  spaces: TerrainNode[];

  constructor(init?:Partial<Tile>) {
    this.spaces = [];

    Object.assign(this, init);
  }

  getSpaceColor(index): RGBColor {
    return this.spaces[index].getColor();
  }

  getAsset(index) {
    return this.spaces[index].getAsset();
  }

  hasCellOfType(type: TerrainType): boolean {
    let targetCell;

    let i: number, len = this.spaces.length;

    for(i = 0; i < len; i++) {
      if(targetCell) {
        continue;
      }

      switch(this.spaces[i].type) {
        case type: {
          targetCell = this.spaces[i];
          break;
        }
      }
    }

    return !!targetCell;
  }
}