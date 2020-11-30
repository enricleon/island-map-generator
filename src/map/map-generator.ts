import { RATES } from '../constants/rates';
import { TerrainType } from '../enums/terrain-type';
import { TerrainNode } from '../models/map/TerrainNode';
import { Tile } from '../models/map/Tile';
import { WaterRate } from '../models/rates/WaterRate';
import { WindRate } from '../models/rates/WindRate';
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
    const tileBalancer = new TileBalancer(false);
    const tileRandomizer = new TileRandomizer({
      gridSize: this._gridSize,
      logEnabled: false,
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
    const spaces:TerrainNode[] = [];

    const totalCells = gridSize * gridSize;

    for(let i = 0; i < totalCells; i++) {
      const terrain = new TerrainNode({
        type: TerrainType.Water,
        rate: new WaterRate({})
      });

      if(i === Math.floor(totalCells / 2)) {
        const wind = new TerrainNode({
          type: TerrainType.Water,
          rate: new WindRate({})
        });

        spaces.push(wind);
      } else {
        spaces.push(terrain);
      }
    }

    return new Tile({ spaces });
  }
}