import { get, writable, type Writable } from "svelte/store";
import { getLocalStorageEntities, getLocalStorageLogs, getLocalStorageTurn, getLocalStorageTheme, setLocalStorageTurn, getLocalStorageCurrentLogId } from "./lib/persistance";
import type { Entity } from "./lib/models/entity";
import type { LogEntry } from "./lib/models/logEntry";

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
export const hasHelpTooltips: Writable<boolean> = writable(true);
export const hasInfoTooltips: Writable<boolean> = writable(true);

export function getActiveEntity(): Entity {
    return get(entities)[get(activeEntityTurnIndex)]
}

export function setModalOpen(isOpen: boolean) {
    isModalOpen.set(isOpen);
}

export function storeCurrentRound() {
    setLocalStorageTurn([get(currentRound), get(activeEntityTurnIndex)]);
}

export function updateSingleEntity(entity: Entity) {
    entities.update(ents => ents.map(e => {
        return e.id === entity.id ? entity : e;
    }));
}