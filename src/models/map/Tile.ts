import { TerrainType } from '../../enums/terrain-type';
import { Rate } from '../rates/Rate';
import { TerrainNode } from './TerrainNode';

export class Tile {
  spaces: TerrainNode[];

  constructor(init?:Partial<Tile>) {
    this.spaces = [];

    Object.assign(this, init);
  }

  getSpaceColor(index): RGBColor {
    return this.spaces[index].getColor();
  }

  getAsset(index) {
    return this.spaces[index].getAsset();
  }

  findTabern(): Rate | undefined {
    let targetTabern;

    let i: number, len = this.spaces.length;

    for(i = 0; i < len; i++) {
      if(targetTabern) {
        continue;
      }

      switch(this.spaces[i].type) {
        case TerrainType.Cocinero:
        case TerrainType.Navegante:
        case TerrainType.Artillero:
        case TerrainType.Vigia: {
          targetTabern = this.spaces[i].rate;
          break;
        }
      }
    }

    return targetTabern;
  }
}