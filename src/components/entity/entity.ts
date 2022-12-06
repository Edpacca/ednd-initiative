import type { PlayerClass } from "../initiative-table/PlayerClass";

export class Entity {
    name: string = ""; 
    type: EntityType;
    class?: PlayerClass;
    initiative?: number; 
    quantity?: number;
    hp?: number;
    bonus?: number;
    ac?: number

    constructor(type: EntityType) {
        this.type = type;
        this.ac = 10;
        this.quantity = 1;
        if (type === EntityType.Player) {
            this.class = "Barbarian";
        }
    }
}

export enum EntityType {
    Player,
    Enemy,
    Minion
}