import { CreatureType } from "./creature";
import type { EntityType } from "./entity";

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