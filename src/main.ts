 /// <reference types="types-for-adobe/Photoshop/2015.5" />
import { MapGenerator } from "./map/map-generator";

function main () {
  const generator = new MapGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    name: 'map-tile'
  });
  
  generator.drawGrid(3, 1);
}

main();