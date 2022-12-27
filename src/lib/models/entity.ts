import { v4 } from "uuid";
import type { CreatureType } from "./creature";
import type { EffectType } from "./effect";

export class Entity {
    name: string = "";
    initiative?: number;
    bonus?: number;
    type: EntityType;
    id: string;

    constructor() {
        this.id = v4();
    }
}

export type EntityType = CreatureType | EffectType
