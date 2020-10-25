import { TerrainType } from '../enums/terrain-type';

export class Rate {
  public name: string;
  public excludeSelf: boolean;
  public value: number;
  public spread: number;
  public type: TerrainType;
  public min: number;
  public max: number;
  public contains: Rate[];

  public constructor(init?:Partial<Rate>) {
    this.contains = new Array<Rate>();

    Object.assign(this, init);
  }
}