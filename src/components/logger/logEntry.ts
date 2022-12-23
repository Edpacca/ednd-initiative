import { Creature, CreatureType } from "../../lib/models/creature"
import type { Entity, EntityType } from "../../lib/models/entity"
import type { PlayerClass } from "../../lib/models/playerClass"

type LogEntity = {
    name: string,
    type: EntityType,
    playerClass?: PlayerClass
}

type Damage = {
    damage: number
}

type LogEntityDamage = LogEntity & Damage

export class LogEntry {
    round: number;
    owner: LogEntity;
    recipients: LogEntityDamage[];
    messages: string[];
    time: Date;

    constructor (entity: Entity, round: number) {
        this.owner = {
            name: entity.name ?? "",
            type: entity.type,
        }

        if (entity.type === CreatureType.Player) {
            this.owner.playerClass = (entity as Creature).class;
        }

        this.round = round;
        this.messages = [];
        this.recipients = [];
        this.time = new Date();
    }

    addMessage(message: string) {
        this.messages.push(message);
    }

    addRecipient(recipient: Creature, damage: number, index=0) {
        const name = recipient.type === CreatureType.Minion ? `${recipient.name}#${index}` : recipient.name;
        const playerClass = recipient.class;
        this.recipients.push({name, type: recipient.type, damage, playerClass});
    }
}