import { get } from "svelte/store";
import type { Creature } from "../../lib/models/creature";
import { LogEntry } from "../../lib/models/logEntry";
import { logs, currentLogId, currentRound, entities, activeEntityTurnIndex } from "../../store";

// to be called when the currentEntityIndex has changed
export function updateLogs(activeEntityTurnIndex: number) {
    const logEntries = get(logs);
    const latestEntityId = get(entities)[activeEntityTurnIndex].id
    const thisRound = get(currentRound);
    const currentRoundLogs = logEntries.filter(l => l.round === thisRound);
    const activeEntityTurnLog = currentRoundLogs.find(l => l.owner.id === latestEntityId)
    // if the current entity has already had a turn
    if (activeEntityTurnLog) {
        currentLogId.set(activeEntityTurnLog.id)
    } else {
        addNewLog();
    }
}

function currentLog() {
    const buffer = get(logs);
    const id = get(currentLogId);
    const index = buffer.findIndex(l => l.id === id);
    return { id, index, buffer }
}

export function addNewLog() {
    const newLog = new LogEntry(get(entities)[get(activeEntityTurnIndex)], get(currentRound));
    logs.update(l => [...l, newLog]);
    currentLogId.set(newLog.id);
}

export function appendDamageToCurrentLog(entity: Creature, damage: number, index=0, overkill=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntityDamage(entity, damage, index, overkill);
    logs.set(log.buffer);
}

export function appendSumDamageToCurrentLog(entity: Creature, damage: number, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntitySumDamage(entity, damage, index);
    logs.set(log.buffer);
}

export function appendConditionToCurrentLog(entity: Creature, condition: string, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntityCondition(entity, condition, index);
    logs.set(log.buffer);
}

export function appendLegendaryActionsToCurrentLog(entity: Creature, actions: number, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntityLegendaryActions(entity, actions, index);
    logs.set(log.buffer);
}

export function clearLogs() {
    logs.set([]);
    currentLogId.set("");
}
