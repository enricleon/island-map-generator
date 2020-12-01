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
    return this.countCellsOfType(type) > 0;
  }

  countCellsOfType(type: TerrainType) {
    let count = 0;

    let i: number, len = this.spaces.length;

    for(i = 0; i < len; i++) {
      if(this.spaces[i].type === type) {
        count++;
      }
    }

    return count;
  }

  toString() {
    return `[${this.spaces.map(space => TerrainType[space.type]).join(",\n")}]`;
  }
}