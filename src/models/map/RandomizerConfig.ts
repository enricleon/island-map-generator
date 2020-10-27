import { Rate } from '../rates/Rate';

export class RandomizerConfig {
  public gridSize: number;
  public logEnabled?: boolean;
  public contentTree: Rate;

  constructor(init?: Partial<RandomizerConfig>) {
    Object.assign(this, init);
  }
}