export class RandomizerConfig {
  public gridSize: number;
  public logEnabled?: boolean;

  constructor(init?: Partial<RandomizerConfig>) {
    Object.assign(this, init);
  }
}