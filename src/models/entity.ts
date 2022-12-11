import type { CreatureType } from "./creature";
import type { EffectType } from "./effect";

export class Entity {
    name: string = "";
    initiative?: number;
    bonus?: number;
    type: EntityType;
}

export type EntityType = CreatureType | EffectType