import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class PortRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<PortRate>) {
    super(init);

    this.type = TerrainType.Port;
  }

  getAsset() {
    return 'port.png';
  }
}