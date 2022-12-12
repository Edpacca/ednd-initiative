import { Entity } from "./entity";

export class Effect extends Entity {
    theme?: string;
    counters?: number[];

    constructor() {
        super();
        this.type = EffectType.Effect;
        this.initiative = 20;
        Object.setPrototypeOf(this, Effect.prototype);
    }
}

export enum EffectType {
    Effect = "effect"
}