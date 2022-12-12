import type { Entity, EntityType } from "./entity";

export interface Encounter {
    name: string;
    entities: Entity[];
    filteredTypes: EntityType[];
}