import { get, writable, type Writable } from "svelte/store";
import { getLocalStorageEntities, getLocalStorageLogs, getLocalStorageTurn, getLocalStorageTheme, setLocalStorageTurn, getLocalStorageCurrentLog } from "./lib/persistance";
import type { Entity } from "./lib/models/entity";
import { LogEntry } from "./components/logger/logEntry";
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
export const currentTheme: Writable<string> = writable(getLocalStorageTheme() ?? "stone");
export const logs: Writable<LogEntry[]> = writable(getLocalStorageLogs());
export const currentLog: Writable<LogEntry> = writable(getLocalStorageCurrentLog());

export function setModalOpen(isOpen: boolean) {
    isModalOpen.set(isOpen);
}

function setCurrentLog() {
    currentLog.set(new LogEntry(get(entities)[get(activeEntityTurnIndex)], get(currentRound)));
}

export function storeCurrentLog() {
    logs.update(l => [...l, get(currentLog)]);
    setCurrentLog();
}

export function clearLogs() {
    logs.set([]);
    setCurrentLog();
}

export function storeCurrentRound() {
    setLocalStorageTurn([get(currentRound), get(activeEntityTurnIndex)]);
}

export function appendDamageToCurrentLog(entity: Creature, damage: number, index=0) {
    const current = get(currentLog);
    current.addLogEntityDamage(entity, damage, index);
    currentLog.set(current);
}

export function appendConditionToCurrentLog(entity: Creature, condition: string, index=0) {
    const current = get(currentLog);
    current.addLogEntityCondition(entity, condition, index);
    currentLog.set(current);
}

export function appendLegendaryActionsToCurrentLog(entity: Creature, actions: number, index=0) {
    const current = get(currentLog);
    current.addLogEntityLegendaryActions(entity, actions, index);
    currentLog.set(current);
}

export function updateSingleEntity(entity: Entity) {
    entities.update(ents => ents.map(e => {
        return e.id === entity.id ? entity : e;
    }));
}