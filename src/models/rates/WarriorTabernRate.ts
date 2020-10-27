import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class WarriorTabernRate extends Rate {
  public constructor(init?:Partial<WarriorTabernRate>) {
    super(init);

    this.type = TerrainType.Artillero;
  }

  getAsset() {
    return 'artillero.png';
  }

  getColor() {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}