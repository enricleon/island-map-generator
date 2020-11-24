 /// <reference types="types-for-adobe/Photoshop/2015.5" />
import { MapGenerator } from './map/map-generator';
import './polyfills/json2.js';

function main () {
  const mapGenerator = new MapGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    gridSize: 3,
    gapSize: 1
  });

  mapGenerator.generateMap(60);
}

main();