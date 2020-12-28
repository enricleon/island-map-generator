import { TerrainType } from '../enums/terrain-type';
// import { RGBColor } from '../models/RGBColor';

var terrain = {} as any;
terrain.red = 249;
terrain.green = 227;
terrain.blue = 154;

var water = {} as any;
water.red = 59;
water.green = 138;
water.blue = 168;

const TERRAIN_COLORS = {};

TERRAIN_COLORS[TerrainType.Island] = terrain;
TERRAIN_COLORS[TerrainType.Terrain] = terrain;
TERRAIN_COLORS[TerrainType.Bonus] = terrain;
TERRAIN_COLORS[TerrainType.Port] = terrain;
TERRAIN_COLORS[TerrainType.Treasure] = terrain;
TERRAIN_COLORS[TerrainType.YellowTreasure] = terrain;
TERRAIN_COLORS[TerrainType.RedTreasure] = terrain;
TERRAIN_COLORS[TerrainType.BlueTreasure] = terrain;
TERRAIN_COLORS[TerrainType.Tabern] = terrain;
TERRAIN_COLORS[TerrainType.Water] = water;
TERRAIN_COLORS[TerrainType.TerrainBonus] = terrain;
TERRAIN_COLORS[TerrainType.NewTerrain] = terrain;
TERRAIN_COLORS[TerrainType.Cocinero] = terrain;
TERRAIN_COLORS[TerrainType.Vigia] = terrain;
TERRAIN_COLORS[TerrainType.Navegante] = terrain;
TERRAIN_COLORS[TerrainType.Artillero] = terrain;
TERRAIN_COLORS[TerrainType.Wind] = water;

export default TERRAIN_COLORS;