import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class PortRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<PortRate>) {
    super(init);

    this.type = TerrainType.Port;
    this.excludeSelf = true;
  }

  getAsset() {
    return 'port.png';
  }

  getColor() {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}