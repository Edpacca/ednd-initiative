import { v4 } from "uuid";
import { Creature, CreatureType } from "./creature";
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

export function getBaseName(entity: Entity, index = 0): string {
    const baseName = entity.name ? entity.name 
        : entity.type === CreatureType.Player 
        ? (entity as Creature).playerClass : entity.type.toString();
        return entity.type === CreatureType.Minion ? `${baseName}#${index + 1}` : baseName;
}