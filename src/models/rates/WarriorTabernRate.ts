import { TerrainType } from '../../enums/terrain-type';
import { Rate } from './Rate';

export class WarriorTabernRate extends Rate {
  public constructor(init?:Partial<WarriorTabernRate>) {
    super(init);

    this.type = TerrainType.Artillero;
  }

  getAsset() {
    return 'artillero.png';
  }
}