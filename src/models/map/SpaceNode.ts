import { TerrainType } from '../../enums/terrain-type';
import { Rate } from '../rates/Rate';

export class SpaceNode {
  public spaces: number;
  public type: TerrainType;
  public excludeSelf: boolean;
  public contains: SpaceNode[];
  public rate: Rate;

  public constructor(init?:Partial<SpaceNode>) {
    this.contains = [];

    Object.assign(this, init);
  }
}