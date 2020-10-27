import { TerrainType } from '../../enums/terrain-type';
import { Rate } from './Rate';

export class TabernRate extends Rate {
  public constructor(init?:Partial<TabernRate>) {
    super(init);

    this.excludeSelf = true;
    this.balanced = true;
    this.type = TerrainType.Tabern;
  }
}