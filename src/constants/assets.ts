import { TerrainType } from '../enums/terrain-type';

var port = 'port.png';
var treasure = 'treasure.png';
var cocinero = 'cocinero.png';
var vigia = 'vigia.png';
var navegante = 'navegante.png';
var artillero = 'artillero.png';

const TERRAIN_ASSETS = {};

TERRAIN_ASSETS[TerrainType.Port] = port;
TERRAIN_ASSETS[TerrainType.Treasure] = treasure;
TERRAIN_ASSETS[TerrainType.Cocinero] = cocinero;
TERRAIN_ASSETS[TerrainType.Vigia] = vigia;
TERRAIN_ASSETS[TerrainType.Navegante] = navegante;
TERRAIN_ASSETS[TerrainType.Artillero] = artillero;

export default TERRAIN_ASSETS;