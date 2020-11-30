import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class NavigatorTreasureRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<NavigatorTreasureRate>) {
    super(init);

    this.type = TerrainType.BlueTreasure;
  }
  
  getAsset() {
    return 'blue.png';
  }
  
  getColor() {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}