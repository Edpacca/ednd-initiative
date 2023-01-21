import { get, writable, type Writable } from "svelte/store";
import { getLocalStorageEntities, getLocalStorageLogs, getLocalStorageTurn, getLocalStorageTheme, setLocalStorageTurn, getLocalStorageCurrentLogIndex } from "./lib/persistance";
import type { Entity } from "./lib/models/entity";
import { LogEntry } from "./lib/models/logEntry";
import type { Creature } from "./lib/models/creature";

const currentTurn = getLocalStorageTurn();

export const entities: Writable<Entity[]> = writable(getLocalStorageEntities());
export const isLocked: Writable<boolean> = writable(false);
export const isModalOpen: Writable<boolean> = writable(false);
export const isStarted: Writable<boolean> = writable(false);
export const isSettingsOpen: Writable<boolean> = writable(false);
export const isLogsOpen: Writable<boolean> = writable(false);
export const currentRound: Writable<number> = writable(currentTurn ? currentTurn[0] : 1);
export const activeEntityTurnIndex: Writable<number> = writable(currentTurn ? currentTurn[1] : 0);
export const activeEntityContextIndex: Writable<number> = writable(0);
export const currentTheme: Writable<string> = writable(getLocalStorageTheme() ?? "stone");
export const logs: Writable<LogEntry[]> = writable(getLocalStorageLogs());
export const currentLogIndex: Writable<number> = writable(getLocalStorageCurrentLogIndex() ?? 0);

export function setModalOpen(isOpen: boolean) {
    isModalOpen.set(isOpen);
}

function getNewlog(index: number): LogEntry {
    return new LogEntry(get(entities)[get(activeEntityTurnIndex)], get(currentRound), index);
}

export function addLog() {
    logs.update(l => [...l, getNewlog(l.length)]);
}

export function clearLogs() {
    logs.set([]);
    currentLogIndex.set(0);
}

export function storeCurrentRound() {
    setLocalStorageTurn([get(currentRound), get(activeEntityTurnIndex)]);
}

export function appendDamageToCurrentLog(entity: Creature, damage: number, index=0) {
    const logBuffer = get(logs);
    const logIndex = get(currentLogIndex);
    const currentLog = logBuffer[logIndex];
    currentLog.addLogEntityDamage(entity, damage, index);
    logBuffer[logIndex] = currentLog;
    logs.set(logBuffer);
    
}

export function appendSumDamageToCurrentLog(entity: Creature, damage: number, index=0) {
    const logBuffer = get(logs);
    const logIndex = get(currentLogIndex);
    const currentLog = logBuffer[logIndex];
    currentLog.addLogEntitySumDamage(entity, damage, index);
    logBuffer[logIndex] = currentLog;
    logs.set(logBuffer);
}

export function appendConditionToCurrentLog(entity: Creature, condition: string, index=0) {
    const logBuffer = get(logs);
    const logIndex = get(currentLogIndex);
    const currentLog = logBuffer[logIndex];
    currentLog.addLogEntityCondition(entity, condition, index);
    logBuffer[logIndex] = currentLog;
    logs.set(logBuffer);
}

export function appendLegendaryActionsToCurrentLog(entity: Creature, actions: number, index=0) {
    const logBuffer = get(logs);
    const logIndex = get(currentLogIndex);
    const currentLog = logBuffer[logIndex];
    currentLog.addLogEntityLegendaryActions(entity, actions, index);
    logBuffer[logIndex] = currentLog;
    logs.set(logBuffer);
}

export function updateSingleEntity(entity: Entity) {
    entities.update(ents => ents.map(e => {
        return e.id === entity.id ? entity : e;
    }));
}