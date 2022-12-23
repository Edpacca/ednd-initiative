import type { Entity, EntityType } from "../../lib/models/entity"

type LogEntity = {
    name: string,
    type: EntityType
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
            name: entity.name,
            type: entity.type
        }

        this.round = round;
        this.messages = [];
        this.recipients = [];
        this.time = new Date();
    }

    addMessage(message: string) {
        this.messages.push(message);
    }

    addRecipient(recipient: Entity, damage: number) {
        this.recipients.push({name: recipient.name, type: recipient.type, damage});
    }
}