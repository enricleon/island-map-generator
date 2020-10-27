import { RATES } from '../constants/rates';
import { WaterRate } from '../models/rates/WaterRate';
import { TileBalancer } from './tile-balancer';
import { TileGenerator } from './tile-generator';
import { TileRandomizer } from './tile-randomizer';

export class MapGenerator {
  private _tileGenerator: TileGenerator;
  private _gridSize: number;

  constructor({
    width,
    height,
    ppi,
    gridSize,
    gapSize
  }) {
    this._gridSize = gridSize;
    this._tileGenerator = new TileGenerator({
      width: width,
      height: height,
      ppi: ppi,
      gridSize: gridSize,
      gapSize: gapSize
    });
  }

  generateMap(numTiles: number) {
    const tileBalancer = new TileBalancer();
    const tileRandomizer = new TileRandomizer({
      gridSize: this._gridSize,
      logEnabled: true,
      contentTree: RATES
    }, tileBalancer);

    const results = [this._getInitialTile(this._gridSize)];
  
    for(var i = 0; i < numTiles - 1; i++) {
      results.push(tileRandomizer.getRandomTile());
    }
    
    results.forEach((result, index) => {
      this._tileGenerator.generateTile(`map-tile-${index + 1}`, result)
    });
  }

  private _getInitialTile(gridSize) {
    const tileRandomizer = new TileRandomizer({
      gridSize: gridSize,
      logEnabled: false,
      contentTree: new WaterRate({
        value: 1,
        min: 9
      })
    });

    return tileRandomizer.getRandomTile();
  }
}