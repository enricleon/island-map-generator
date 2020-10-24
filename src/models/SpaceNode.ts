import { TerrainType } from '../enums/terrain-type';

export class SpaceNode {
  public spaces: number;
  public type: TerrainType;
  public transparent: boolean;
  public contains: SpaceNode[];

  public constructor(init?:Partial<SpaceNode>) {
    this.contains = [];

    Object.assign(this, init);
  }
}