import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class TerrainRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<TerrainRate>) {
    super(init);

    this.type = TerrainType.Terrain;
  }
}