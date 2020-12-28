import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class LookoutTabernRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<LookoutTabernRate>) {
    super(init);

    this.type = TerrainType.Vigia;
  }

  getAsset() {
    return 'vigia.png';
  }
}