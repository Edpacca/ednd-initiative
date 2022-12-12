import { Entity } from "./entity";
import { getRandomClass, type PlayerClass } from "./playerClass";

export class Creature extends Entity {
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
        this.hpMax = 10;
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