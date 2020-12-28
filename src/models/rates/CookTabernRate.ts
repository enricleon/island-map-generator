import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class CookTabernRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<CookTabernRate>) {
    super(init);

    this.type = TerrainType.Cocinero;
  }
  
  getAsset() {
    return 'cocinero.png';
  }
}