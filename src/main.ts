 /// <reference types="types-for-adobe/Photoshop/2015.5" />
import { MapGenerator } from "./map/map-generator";

function main () {
  const generator = new MapGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    gridSize: 3,
    gapSize: 1
  });

  for(var i = 0; i < 48; i++) {
    generator.generateTile(`map-tile-${i + 1}`);
  }
}

main();