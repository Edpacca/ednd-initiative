import { Creature, CreatureType } from "../../lib/models/creature"
import type { Entity, EntityType } from "../../lib/models/entity"
import type { PlayerClass } from "../../lib/models/playerClass"
import { v4 } from "uuid";

type LogEntity = {
    name: string,
    type: EntityType,
    id: string,
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
    id: string;
    round: number;
    owner: LogEntity;
    recipients: LogEntityAny[];
    messages: string[];
    time: Date;

    constructor (entity: Entity, round: number) {
        this.owner = {
            name: entity.name ? entity.name : getBaseName(entity),
            type: entity.type,
            id: entity.id
        }
        
        this.id = entity.id;

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
        const name = getBaseName(recipient);
        const playerClass = recipient.class;
        this.recipients.push({ 
            name, 
            damage, 
            playerClass, 
            id: recipient.id,
            type: recipient.type, 
            logType: "damage"
        });
    }


    addLogEntityCondition(recipient: Creature, condition: string, index=0) {
        const name = getBaseName(recipient);
        const playerClass = recipient.class;
        this.recipients.push({
            name,
            condition,
            playerClass,
            id: recipient.id,
            type: recipient.type,
            logType: "condition"
        });
    }

    addLogEntityLegendaryActions(recipient: Creature, numberOfActions: number, index=0) {
        const name = getBaseName(recipient);
        const existing = this.recipients.find(r => r.logType === "legendary" && r.id === recipient.id)

        if (existing) {
            (existing as LegendaryAction).actions += numberOfActions;
            this.recipients[this.recipients.indexOf(existing)] = existing;
        } else {
            this.recipients.push({
                name,
                actions: numberOfActions,
                id: recipient.id,
                type: recipient.type,
                logType: "legendary"});
        }
    }
}

function getBaseName(entity: Entity, index = 0): string {
    const baseName = entity.name ? entity.name 
        : entity.type === CreatureType.Player 
        ? (entity as Creature).class : entity.type.toString();
        return entity.type === CreatureType.Minion ? `${baseName}#${index}` : baseName;
}