import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class NavigatorTabernRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<NavigatorTabernRate>) {
    super(init);

    this.type = TerrainType.Navegante;
  }

  getAsset() {
    return 'navegante.png';
  }

  getColor() {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}