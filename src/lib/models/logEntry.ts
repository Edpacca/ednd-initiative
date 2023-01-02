import { Creature, CreatureType } from "./creature"
import { getBaseName, type Entity, type EntityType } from "./entity"
import type { PlayerClass } from "./playerClass"
import { v4 } from "uuid";

type LogEntity = {
    name: string,
    type: EntityType,
    id: string,
    playerClass?: PlayerClass,
    index: number
}

type Damage = { damage: number, logType: "damage" }
type LegendaryAction = { actions: number, logType: "legendary" }
type Condition = { condition: string, logType: "condition" }

type LogEntityDamage = LogEntity & Damage;
type LogEntityLegendaryAction = LogEntity & LegendaryAction;
type LogEntityCondition = LogEntity & Condition;
export type LogEntityAny = LogEntityDamage | LogEntityCondition | LogEntityLegendaryAction

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
            id: entity.id,
            index: 0
        }
        
        this.id = entity.id;

        if (entity.type === CreatureType.Player) {
            this.owner.playerClass = (entity as Creature).playerClass;
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
        const name = getBaseName(recipient, index);
        const playerClass = recipient.playerClass;
        this.recipients.push({ 
            name, 
            damage, 
            index,
            playerClass, 
            id: recipient.id,
            type: recipient.type, 
            logType: "damage",
        });
    }


    addLogEntityCondition(recipient: Creature, condition: string, index=0) {
        const name = getBaseName(recipient, index);
        const playerClass = recipient.playerClass;
        this.recipients.push({
            name,
            condition,
            index,
            playerClass,
            id: recipient.id,
            type: recipient.type,
            logType: "condition"
        });
    }

    addLogEntityLegendaryActions(recipient: Creature, numberOfActions: number, index=0) {
        const name = getBaseName(recipient, index);
        const existing = this.recipients.find(r => r.logType === "legendary" && r.id === recipient.id)

        if (existing) {
            (existing as LegendaryAction).actions += numberOfActions;
            this.recipients[this.recipients.indexOf(existing)] = existing;
        } else {
            this.recipients.push({
                name,
                index,
                actions: numberOfActions,
                id: recipient.id,
                type: recipient.type,
                logType: "legendary"});
        }
    }

    removeLogEntity(logEntity: LogEntityAny) {
        this.recipients = this.recipients.filter(r => r !== logEntity);
    }
}
