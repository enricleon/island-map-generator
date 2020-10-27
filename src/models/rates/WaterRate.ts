import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class WaterRate extends Rate {
  public constructor(init?:Partial<WaterRate>) {
    super(init);

    this.type = TerrainType.Water;
  }

  getColor() {
    return TERRAIN_COLORS[ColorType.Water];
  }
}