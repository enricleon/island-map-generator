import TERRAIN_ASSETS from '../../constants/assets';
import TERRAIN_COLORS from '../../constants/colors';
import { TerrainNode } from './TerrainNode';

export class Tile {
  spaces: TerrainNode[];

  constructor(init?:Partial<Tile>) {
    this.spaces = [];

    Object.assign(this, init);
  }

  getSpaceColor(index): RGBColor {
    return this.spaces[index]
      .getColor();
  }

  getAsset(index) {
    return this.spaces[index].getAsset();
  }
}