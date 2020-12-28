import { TerrainType } from '../../enums/terrain-type';
import { Rate } from './Rate';

export class TreasureRate extends Rate  {
  public constructor(init?:Partial<TreasureRate>) {
    super(init);

    this.excludeSelf = true;
    this.type = TerrainType.Treasure;
    this.balanced = true;
  }
}