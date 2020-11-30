import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';
import { Rate } from './Rate';

export class WarriorTreasureRate extends Rate implements PhysicalRate {
  public constructor(init?:Partial<WarriorTreasureRate>) {
    super(init);

    this.type = TerrainType.RedTreasure;
  }
  
  getAsset() {
    return 'red.png';
  }
  
  getColor() {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}