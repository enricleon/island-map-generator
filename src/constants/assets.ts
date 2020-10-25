import { TerrainType } from '../enums/terrain-type';

var port = 'port.png';
var tabern = 'tabern.png';
var treasure = 'treasure.png';

const TERRAIN_ASSETS = {};

TERRAIN_ASSETS[TerrainType.Port] = port;
TERRAIN_ASSETS[TerrainType.Tabern] = tabern;
TERRAIN_ASSETS[TerrainType.Treasure] = treasure;

export default TERRAIN_ASSETS;