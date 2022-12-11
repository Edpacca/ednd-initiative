import { Entity } from "./entity";

export class Effect extends Entity {
    theme?: string;
    counters?: number[];

    constructor() {
        super();
        this.type = EffectType.Effect;
    }
}

export enum EffectType {
Effect = "effect"
}