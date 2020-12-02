import { ColorType } from '../enums/color-type';
// import { RGBColor } from '../models/RGBColor';

var terrain = new RGBColor();
terrain.red = 249;
terrain.green = 227;
terrain.blue = 154;

var water = new RGBColor();
water.red = 59;
water.green = 138;
water.blue = 168;

const TERRAIN_COLORS = {};

TERRAIN_COLORS[ColorType.Terrain] = terrain;
TERRAIN_COLORS[ColorType.Water] = water;

export default TERRAIN_COLORS;