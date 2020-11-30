import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class TreasureRate extends Rate  {
  public constructor(init?:Partial<TreasureRate>) {
    super(init);

    this.excludeSelf = true;
    this.type = TerrainType.Treasure;
    this.balanced = true;
  }
}