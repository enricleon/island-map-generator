import { TerrainType } from '../enums/terrain-type';

var port = new RGBColor();
port.red = 111;
port.green = 23;
port.blue = 100;

var tabern = new RGBColor();
tabern.red = 255;
tabern.green = 156;
tabern.blue = 0;

var treasure = new RGBColor();
treasure.red = 117;
treasure.green = 73;
treasure.blue = 3;

var terrain = new RGBColor();
terrain.red = 249;
terrain.green = 236;
terrain.blue = 195;

var water = new RGBColor();
water.red = 34;
water.green = 108;
water.blue = 168;

const TERRAIN_COLORS = {};

TERRAIN_COLORS[TerrainType.Port] = terrain;
TERRAIN_COLORS[TerrainType.Tabern] = terrain;
TERRAIN_COLORS[TerrainType.Treasure] = terrain;
TERRAIN_COLORS[TerrainType.Terrain] = terrain;
TERRAIN_COLORS[TerrainType.Water] = water;

export default TERRAIN_COLORS;