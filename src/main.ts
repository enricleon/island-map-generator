 /// <reference types="types-for-adobe/Photoshop/2015.5" />
 
import { TerrainType } from './enums/terrain-type';
import { TileGenerator } from "./map/tile-generator";
import { TileRandomizer } from './map/tile-randomizer';

function main () {
  const generator = new TileGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    gridSize: 3,
    gapSize: 1
  });

  const tileRandomizer = new TileRandomizer(3);
  const results = new Array<TerrainType[]>();

  for(var i = 0; i < 1; i++) {
    results.push(tileRandomizer.getRandomTile());
  }

  
  results.forEach((result, index) => {
    generator.generateTile(`map-tile-${index + 1}`, result)
  });
}

main();