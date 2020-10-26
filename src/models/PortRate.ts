import { TerrainType } from '../enums/terrain-type';
import { Rate } from './Rate';

export class PortRate extends Rate {
  public excludeSelf: boolean;
  public value: number;
  public min: number;
  public max: number;
  public contains: Rate[];

  public constructor(init?:Partial<PortRate>) {
    super(init);

    this.type = TerrainType.Port;
  }
}