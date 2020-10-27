import { TerrainType } from '../enums/terrain-type';

export class Rate {
  public excludeSelf: boolean;
  public value: number;
  public type: TerrainType;
  public min: number;
  public max: number;
  public balanced: boolean;
  public contains: Rate[];

  public constructor(init?:Partial<Rate>) {
    this.contains = new Array<Rate>();

    Object.assign(this, init);
  }
}