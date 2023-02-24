import { get, writable, type Writable } from "svelte/store";
import { getLocalStorageEntities, getLocalStorageLogs, getLocalStorageTurn, getLocalStorageTheme, setLocalStorageTurn, getLocalStorageCurrentLogId } from "./lib/persistance";
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
export const currentLogId: Writable<string> = writable(getLocalStorageCurrentLogId() ?? ""  );
export const zoomLevel: Writable<number> = writable(1);

export function getActiveEntity(): Entity {
    return get(entities)[get(activeEntityTurnIndex)]
}

export function setModalOpen(isOpen: boolean) {
    isModalOpen.set(isOpen);
}

export function addNewLog() {
    const newLog = new LogEntry(get(entities)[get(activeEntityTurnIndex)], get(currentRound));
    logs.update(l => [...l, newLog]);
    currentLogId.set(newLog.id);
}

export function clearLogs() {
    logs.set([]);
    currentLogId.set("");
}

export function storeCurrentRound() {
    setLocalStorageTurn([get(currentRound), get(activeEntityTurnIndex)]);
}

function currentLog() {
    const buffer = get(logs);
    const id = get(currentLogId);
    const index = buffer.findIndex(l => l.id === id);
    return { id, index, buffer }
}

export function appendDamageToCurrentLog(entity: Creature, damage: number, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntityDamage(entity, damage, index);
    logs.set(log.buffer);
}

export function appendSumDamageToCurrentLog(entity: Creature, damage: number, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntitySumDamage(entity, damage, index);;
    logs.set(log.buffer);
}

export function appendConditionToCurrentLog(entity: Creature, condition: string, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntityCondition(entity, condition, index);;
    logs.set(log.buffer);
}

export function appendLegendaryActionsToCurrentLog(entity: Creature, actions: number, index=0) {
    const log = currentLog();
    log.buffer[log.index].addLogEntityLegendaryActions(entity, actions, index);;
    logs.set(log.buffer);
}

export function updateSingleEntity(entity: Entity) {
    entities.update(ents => ents.map(e => {
        return e.id === entity.id ? entity : e;
    }));
}