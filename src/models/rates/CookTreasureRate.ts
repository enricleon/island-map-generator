import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class CookTreasureRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<CookTreasureRate>) {
    super(init);

    this.type = TerrainType.YellowTreasure;
  }
  
  getAsset() {
    return 'yellow.png';
  }
}