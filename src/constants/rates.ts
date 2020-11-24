import { BonusRate } from '../models/rates/BonusRate';
import { CookTabernRate } from '../models/rates/CookTabernRate';
import { LookoutTabernRate } from '../models/rates/LookoutTabernRate';
import { NavigatorTabernRate } from '../models/rates/NavigatorTabernRate';
import { PortRate } from '../models/rates/PortRate';
import { TabernRate } from '../models/rates/TabernRate';
import { TerrainBonusRate } from '../models/rates/TerrainBonusRate';
import { TerrainRate } from '../models/rates/TerrainRate';
import { TreasureRate } from '../models/rates/TreasureRate';
import { WarriorTabernRate } from '../models/rates/WarriorTabernRate';
import { WaterRate } from '../models/rates/WaterRate';
import { WindRate } from '../models/rates/WindRate';

export const RATES = new WaterRate({
  value: 1,
  contains: [
    new TerrainRate({
    value: 0.28,
    min: 1,
    max: 3,
    contains: [
      new BonusRate({
        value: 0.5,
        min: 1,
        max: 2,
        contains: [
          new TerrainBonusRate({
            value: 0.62,
            max: 1,
            contains: [
              new TabernRate({
                value: 0.5,
                contains: [
                  new CookTabernRate({
                    value: 0.33
                  }),
                  new WarriorTabernRate({
                    value: 0.33
                  }),
                  new NavigatorTabernRate({
                    value: 0.33
                  }),
                  // new LookoutTabernRate({
                  //   value: 0.25
                  // }),
                ]
              }),
              new TreasureRate({
                value: 0.5
              })
            ]
          }),
          new PortRate({
            value: 0.23
          }),
          new WindRate({
            value: 0.15
          }),
        ],
      }),
    ],
  })
]});
