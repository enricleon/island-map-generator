 /// <reference types="types-for-adobe/Photoshop/2015.5" />
import { MapGenerator } from "./map/map-generator";
import { TileRandomizer } from './map/tile-randomizer';

function main () {
  const generator = new MapGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    gridSize: 3,
    gapSize: 1
  });

  const tileRandomizer = new TileRandomizer(3);
  const results = [];

  for(var i = 0; i < 48; i++) {
    results.push(tileRandomizer.getRandomTile());
  }

  results.forEach((result, index) => {
    generator.generateTile(`map-tile-${index + 1}`, result)
  });
}

main();