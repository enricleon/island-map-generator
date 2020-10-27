import TERRAIN_ASSETS from '../constants/assets';
import TERRAIN_COLORS from '../constants/colors';
import { TerrainType } from '../enums/terrain-type';

export class Tile {
  spaces: TerrainType[];

  constructor(init?:Partial<Tile>) {
    this.spaces = [];

    Object.assign(this, init);
  }

  getSpaceColor(index): RGBColor {
    return TERRAIN_COLORS[this.spaces[index]];
  }

  getAsset(index): string {
    return TERRAIN_ASSETS[this.spaces[index]];
  }
}