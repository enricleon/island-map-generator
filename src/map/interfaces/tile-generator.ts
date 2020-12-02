import { Tile } from '../../models/map/Tile';

export interface TileGenerator {
  generateTile(tile: Tile);
}