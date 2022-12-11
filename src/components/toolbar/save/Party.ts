import type { Entity, EntityType } from "../../entity/entity";

export interface Party {
    name: string;
    party: Entity[];
    filteredTypes: EntityType[];
}