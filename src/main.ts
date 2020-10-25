 /// <reference types="types-for-adobe/Photoshop/2015.5" />
import './polyfills/json2.js';

import { TerrainType } from './enums/terrain-type';
import { TileGenerator } from "./map/tile-generator";
import { TileRandomizer } from './map/tile-randomizer';

const GRID_SIZE = 3;

function main () {
  const generator = new TileGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    gridSize: GRID_SIZE,
    gapSize: 1
  });

  const tileRandomizer = new TileRandomizer(GRID_SIZE, true);
  const results = new Array<TerrainType[]>();

  // generator.generateTile(`map-tile-0`, [
  //   TerrainType.Treasure,
  //   TerrainType.Water,
  //   TerrainType.Port,
  //   TerrainType.Water,
  //   TerrainType.Port,
  //   TerrainType.Water,
  //   TerrainType.Tabern,
  //   TerrainType.Port,
  //   TerrainType.Water
  // ]);

  // generator.generateTile(`map-tile-0`, [...new Array(9).fill(TerrainType.Water)]);

  for(var i = 0; i < 47; i++) {
    results.push(tileRandomizer.getRandomTile());
  }
  
  results.forEach((result, index) => {
    generator.generateTile(`map-tile-${index + 1}`, result)
  });
}

main();