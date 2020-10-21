import { TerrainType } from '../enums/terrain-type';

export class Rate {
  public name: string;
  public transparent: boolean;
  public value: number;
  public spread: number;
  public type: TerrainType;
  public min: number;
  public contains: Rate[];

  public constructor(init?:Partial<Rate>) {
    this.contains = [];

    Object.assign(this, init);
  }
}