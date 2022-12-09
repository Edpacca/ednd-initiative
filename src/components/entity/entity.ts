import type { PlayerClass } from "../initiativeTable/PlayerClass";

export class Entity {
    name: string = ""; 
    type: EntityType;
    class?: PlayerClass;
    initiative?: number; 
    quantity?: number;
    hpMax?: number;
    hpCurrent?: number[];
    bonus?: number;
    ac?: number

    constructor(type: EntityType) {
        this.type = type;
        this.ac = 10;
        this.quantity = 1;
        this.hpCurrent = [0];
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