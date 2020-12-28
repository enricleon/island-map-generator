import { TerrainType } from '../../enums/terrain-type';
import { Rate } from './Rate';

export class WaterRate extends Rate {
  public constructor(init?:Partial<WaterRate>) {
    super(init);

    this.type = TerrainType.Water;
  }
}