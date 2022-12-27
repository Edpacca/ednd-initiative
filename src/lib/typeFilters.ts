import { CreatureType } from "./models/creature";
import type { EntityType } from "./models/entity";

export const CREATURE_TYPES: EntityType[] = [
    CreatureType.Player,
    CreatureType.Enemy,
    CreatureType.Minion,
    CreatureType.Boss
]

export const ENEMY_CREATURE_TYPES: EntityType[] = [
    CreatureType.Enemy,
    CreatureType.Minion,
    CreatureType.Boss
]