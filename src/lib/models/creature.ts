import { Entity } from "./entity";
import { getRandomClass, type PlayerClass } from "./playerClass";

export class Creature extends Entity {
    class?: PlayerClass;
    quantity?: number;
    laMax?: number;
    laCurrent?: number;
    hpMax?: number;
    hpCurrent?: number[];
    ac?: number;
    conditions?: string[];

    constructor(type: CreatureType) {
        super();
        this.type = type;
        this.ac = 10;
        this.quantity = 1;
        this.laMax = 1;
        this.laCurrent = 1;
        this.hpMax = 10;
        this.conditions = [];
        this.hpCurrent = [10];
        if (type === CreatureType.Player) {
            this.class = getRandomClass();
        }

        Object.setPrototypeOf(this, Creature.prototype);
    }
}

export enum CreatureType {
    Player = "player",
    Enemy = "enemy",
    Minion = "minion",
    Boss = "boss"
}