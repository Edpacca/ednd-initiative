import { Entity } from "./entity";
import type { PlayerClass } from "./PlayerClass";

export class Creature extends Entity {
    declare type: CreatureType;
    class?: PlayerClass;
    quantity?: number;
    hpMax?: number;
    hpCurrent?: number[];
    ac?: number

    constructor(type: CreatureType) {
        super();
        this.type = type;
        this.ac = 10;
        this.quantity = 1;
        this.hpCurrent = [10];
        if (type === CreatureType.Player) {
            this.class = "Paladin";
        }
    }
}

export enum CreatureType {
    Player = "player",
    Enemy = "enemy",
    Minion = "minion",
    Boss = "boss"
}