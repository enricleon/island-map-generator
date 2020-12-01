import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class WindRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<WindRate>) {
    super(init);

    this.type = TerrainType.Wind;
  }
  
  getAsset() {
    return 'wind.png';
  }
  
  getColor() {
    return TERRAIN_COLORS[ColorType.Water];
  }
}