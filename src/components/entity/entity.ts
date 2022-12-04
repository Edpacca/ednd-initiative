import type { PlayerIconType } from "../player-table/PlayerIconType";

export class Entity {
    name: string = ""; 
    type: EntityType;
    icon?: PlayerIconType;
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
            this.icon = "Barbarian";
        }
    }
}

export enum EntityType {
    Player,
    Enemy,
    Minion
}