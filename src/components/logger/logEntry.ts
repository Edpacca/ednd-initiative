import { Creature, CreatureType } from "../../lib/models/creature"
import type { Entity, EntityType } from "../../lib/models/entity"
import type { PlayerClass } from "../../lib/models/playerClass"

type LogEntity = {
    name: string,
    type: EntityType,
    playerClass?: PlayerClass
}

type Damage = { damage: number, logType: "damage" }
type LegendaryAction = { actions: number, logType: "legendary" }
type Condition = { condition: string, logType: "condition" }

type LogEntityDamage = LogEntity & Damage;
type LogEntityLegendaryAction = LogEntity & LegendaryAction;
type LogEntityCondition = LogEntity & Condition;
type LogEntityAny = LogEntityDamage | LogEntityCondition | LogEntityLegendaryAction

export class LogEntry {
    round: number;
    owner: LogEntity;
    recipients: LogEntityAny[];
    messages: string[];
    time: Date;

    constructor (entity: Entity, round: number) {
        this.owner = {
            name: entity.name ? entity.name : getBaseName(entity),
            type: entity.type,
        }

        console.log(this.owner.name)

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

    addLogEntityDamage(recipient: Creature, damage: number, index=0) {
        const baseName = recipient.name ?? getBaseName(recipient);
        const name = recipient.type === CreatureType.Minion ? `${baseName}#${index}` : baseName;
        const playerClass = recipient.class;
        this.recipients.push({name, type: recipient.type, damage, playerClass, logType: "damage"});
    }

    addLogEntityCondition(recipient: Creature, condition: string, index=0) {
        const baseName = recipient.name ?? getBaseName(recipient);
        const name = recipient.type === CreatureType.Minion ? `${baseName}#${index}` : baseName;
        const playerClass = recipient.class;
        this.recipients.push({name, type: recipient.type, condition, playerClass, logType: "condition"});
    }

    addLogEntityLegendaryActions(recipient: Creature, actions: number, index=0) {
        const baseName = recipient.name ?? getBaseName(recipient);
        const existing = this.recipients.find(r => r.logType === "legendary" && r.name === baseName)

        if (existing) {
            (existing as LegendaryAction).actions += actions;
            this.recipients[this.recipients.indexOf(existing)] = existing;
        } else {
            this.recipients.push({name: recipient.name, type: recipient.type, actions, logType: "legendary"});
        }
    }
}

function getBaseName(entity: Entity): string {
    return entity.type === CreatureType.Player ? (entity as Creature).class : entity.type.toString();
}