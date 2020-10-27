import { TerrainType } from '../enums/terrain-type';
import { PortRate } from '../models/PortRate';
import { Rate } from '../models/Rate';

export const RATES = new Rate({
  value: 1,
  type: TerrainType.Water,
  contains: [
    new Rate({
    value: 0.31,
    type: TerrainType.Terrain,
    min: 1,
    max: 3,
    contains: [
      new Rate({
        value: 0.62,
        excludeSelf: true,
        min: 1,
        max: 2,
        type: TerrainType.Bonus,
        contains: [
          new Rate({
            value: 0.62,
            max: 1,
            excludeSelf: true,
            type: TerrainType.TerrainBonus,
            contains: [
              new Rate({
                value: 0.5,
                type: TerrainType.Tabern,
                excludeSelf: true,
                balanced: true,
                contains: [
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Cocinero
                  }),
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Vigia,
                  }),
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Navegante,
                  }),
                  new Rate({
                    value: 0.25,
                    type: TerrainType.Artillero,
                  }),
                ]
              }),
              new Rate({
                value: 0.5,
                type: TerrainType.Treasure,
              })
            ]
          }),
          new PortRate({
            value: 0.38
          }),
        ],
      }),
    ],
  })
]});
