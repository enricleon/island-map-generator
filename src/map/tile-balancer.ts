import { Tile } from '../models/Tile';

export class TileBalancer {
  private tiles: Tile[];

  constructor (
  ) {
    this.tiles = [];
  }

  addNewTile(tile: Tile) {
    this.tiles.push(tile);
  }

  isValid(tile: Tile) {
    return true;
  }
}
