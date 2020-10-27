import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class TreasureRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<TreasureRate>) {
    super(init);

    this.type = TerrainType.Treasure;
  }

  getAsset() {
    return 'treasure.png';
  }

  getColor() {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}