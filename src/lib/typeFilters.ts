import { CreatureType } from "./models/creature";
import type { EntityType } from "./models/entity";

export const CREATURES: EntityType[] = [
    CreatureType.Player,
    CreatureType.Enemy,
    CreatureType.Minion,
    CreatureType.Boss
]

export const ENEMY_CREATURES: EntityType[] = [
    CreatureType.Enemy,
    CreatureType.Minion,
    CreatureType.Boss
]