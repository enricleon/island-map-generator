import { TerrainType } from '../../enums/terrain-type';
import { Rate } from '../rates/Rate';

export class TerrainNode {
  public type: TerrainType;
  public rate: Rate;

  public constructor(init?:Partial<TerrainNode>) {
    Object.assign(this, init);
  }

  public getColor() {
    return this.rate.getColor();
  }

  public getAsset() {
    return this.rate.getAsset();
  }
}