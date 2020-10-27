import { TerrainType } from '../../enums/terrain-type';
import { Rate } from './Rate';

export class TerrainBonusRate extends Rate {
  public constructor(init?:Partial<TerrainBonusRate>) {
    super(init);

    this.excludeSelf = true;
    this.type = TerrainType.TerrainBonus;
  }
}