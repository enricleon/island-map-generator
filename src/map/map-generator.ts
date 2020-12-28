import { RATES } from '../constants/rates';
import { TerrainType } from '../enums/terrain-type';
import { TerrainNode } from '../models/map/TerrainNode';
import { Tile } from '../models/map/Tile';
import { WaterRate } from '../models/rates/WaterRate';
import { WindRate } from '../models/rates/WindRate';
import { TileBalancer } from './tile-balancer';
import { TileRandomizer } from './tile-randomizer';
import { TileGenerator } from './interfaces/tile-generator';
// import { PhotoshopTileGenerator } from './photoshop-tile-generator';
import { ExcelTileGenerator } from './excel-tile-generator';

export class MapGenerator {
  // private _tileGenerator: TileGenerator;
  private _generator: TileGenerator;
  private _gridSize: number;

  constructor({
    width,
    height,
    ppi,
    gridSize,
    gapSize
  }) {
    this._gridSize = gridSize;
    this._generator = new ExcelTileGenerator({
      filename: ''
    });
    // this._generator = new PhotoshopTileGenerator({
    //   width: width,
    //   height: height,
    //   ppi: ppi,
    //   gridSize: gridSize,
    //   gapSize: gapSize
    // });
  }

  generateMap(numPlayers?: number) {
    const tileBalancer = new TileBalancer(numPlayers);

    const tileRandomizer = new TileRandomizer({
      gridSize: this._gridSize,
      logEnabled: false,
      contentTree: RATES
    }, tileBalancer);

    const results = [this._getInitialTile(this._gridSize)];

    while(tileBalancer.hasPendingTiles()) {
      const tile = tileRandomizer.getRandomTile();
      results.push(tile);
    }
    
    results.forEach((result, index) => {
      result.name = `map-tile-${index + 1}`;
      this._generator.generateTile(result);
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