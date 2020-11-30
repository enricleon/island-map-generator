import { BonusRate } from '../models/rates/BonusRate';
import { CookTabernRate } from '../models/rates/CookTabernRate';
import { CookTreasureRate } from '../models/rates/CookTreasureRate';
import { LookoutTabernRate } from '../models/rates/LookoutTabernRate';
import { NavigatorTabernRate } from '../models/rates/NavigatorTabernRate';
import { NavigatorTreasureRate } from '../models/rates/NavigatorTreasure';
import { PortRate } from '../models/rates/PortRate';
import { TabernRate } from '../models/rates/TabernRate';
import { TerrainBonusRate } from '../models/rates/TerrainBonusRate';
import { TerrainRate } from '../models/rates/TerrainRate';
import { TreasureRate } from '../models/rates/TreasureRate';
import { WarriorTabernRate } from '../models/rates/WarriorTabernRate';
import { WarriorTreasureRate } from '../models/rates/WarriorTreasure';
import { WaterRate } from '../models/rates/WaterRate';

export const RATES = new WaterRate({
  value: 1,
  contains: [
    new TerrainRate({
    value: 0.28,
    min: 1,
    max: 4,
    contains: [
      new BonusRate({
        value: 0.6,
        min: 1,
        max: 2,
        contains: [
          new TerrainBonusRate({
            value: 0.62,
            max: 1,
            min: 1,
            contains: [
              new TabernRate({
                value: 0.5,
                contains: [
                  new CookTabernRate({
                    value: 0.25
                  }),
                  new WarriorTabernRate({
                    value: 0.25
                  }),
                  new NavigatorTabernRate({
                    value: 0.25
                  }),
                  new LookoutTabernRate({
                    value: 0.25
                  }),
                ]
              }),
              new TreasureRate({
                value: 0.5,
                contains: [
                  new CookTreasureRate({
                    value: 0.33
                  }),
                  new WarriorTreasureRate({
                    value: 0.33
                  }),
                  new NavigatorTreasureRate({
                    value: 0.33
                  }),
                  // new LookoutTabernRate({
                  //   value: 0.25
                  // }),
                ]
              }),
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
