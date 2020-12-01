import TERRAIN_COLORS from '../../constants/colors';
import { ColorType } from '../../enums/color-type';
import { TerrainType } from '../../enums/terrain-type';
import { PhysicalRate } from './interfaces/PhysicalRate';

export class Rate implements PhysicalRate {
  public excludeSelf: boolean;
  public value: number;
  public type: TerrainType;
  public min: number;
  public max: number;
  public balanced: boolean;
  public contains: Rate[];
  public playerCount: any;

  public constructor(init?:Partial<Rate>) {
    this.contains = new Array<Rate>();

    Object.assign(this, init);
  }

  getAsset(): string | undefined {
    return undefined;
  }

  getColor(): RGBColor {
    return TERRAIN_COLORS[ColorType.Terrain];
  }
}