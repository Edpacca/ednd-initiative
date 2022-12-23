import { get, writable, type Writable } from "svelte/store";
import { getLocalStorageEntities, getLocalStorageTheme } from "./lib/persistance";
import type { Entity } from "./lib/models/entity";
import { LogEntry } from "./components/logger/logEntry";
import type { Creature } from "./lib/models/creature";

export const entities: Writable<Entity[]> = writable(getLocalStorageEntities());
export const isLocked: Writable<boolean> = writable(false);
export const isModalOpen: Writable<boolean> = writable(false);
export const isStarted: Writable<boolean> = writable(false);
export const currentRound: Writable<number> = writable(1);
export const activeEntityTurnIndex: Writable<number> = writable(0);
export const currentTheme: Writable<string> = writable(getLocalStorageTheme() ?? "stone");
export const logs: Writable<LogEntry[]> = writable([]);
export const currentLog: Writable<LogEntry> = writable(undefined);

export function setModalOpen(isOpen: boolean) {
    isModalOpen.set(isOpen);
}

export function storeCurrentLog() {
    logs.update(l => [...l, get(currentLog)]);

    currentLog.set(new LogEntry(get(entities)[get(activeEntityTurnIndex)], get(currentRound)));
}

export function appendToCurrentLog(entity: Creature, damage: number, index=0) {
    get(currentLog).addRecipient(entity, damage, index);
}