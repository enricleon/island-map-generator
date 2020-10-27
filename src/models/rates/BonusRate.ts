import { TerrainType } from '../../enums/terrain-type';
import { Rate } from './Rate';

export class BonusRate extends Rate {
  public constructor(init?:Partial<BonusRate>) {
    super(init);

    this.excludeSelf = true;
    this.type = TerrainType.Bonus;
  }
}