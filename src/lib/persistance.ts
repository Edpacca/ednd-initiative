import type { LogEntry } from "../components/logger/logEntry";
import type { Encounter } from "./models/encounter";
import type { Entity, EntityType } from "./models/entity";

export class SaveError extends Error {}

enum StorageType {
    Entity = "entities",
    Encounter = "encounters",
    Theme = "theme",
    Logs = "logs",
    CurrentLog = "current-log",
    Turn = "turn",
}

export function getLocalStorageEntities(): Entity[] {
    return getLocalStorageArr(StorageType.Entity);
}

export function setLocalStorageEntities(entities: Entity[]) {
    setLocalStorageArr(StorageType.Entity, entities);
}

export function getLocalStorageEncounters(): Encounter[] {
    return getLocalStorageArr(StorageType.Encounter);
}

export function getLocalStorageEncounter(name: string): Encounter | undefined {
    return getLocalStorageEncounters().find(p => p.name === name);
}

export function setLocalStorageLogs(logs: LogEntry[]) {
    setLocalStorageArr(StorageType.Logs, logs);
}

export function getLocalStorageLogs(): LogEntry[] {
    return getLocalStorageArr(StorageType.Logs);
}

export function getLocalStorageTurn(): [number, number] {
    return getLocalStorage(StorageType.Turn)
}

export function setLocalStorageTurn(turn: [number, number]) {
    setLocalStorage(StorageType.Turn, turn);
}

export function setLocalStorageCurrentLog(currentLog: LogEntry) { 
    setLocalStorage(StorageType.CurrentLog, currentLog);
}

export function getLocalStorageCurrentLog(): LogEntry {
    return getLocalStorage(StorageType.CurrentLog);
}

export function setLocalStorageEncounter(name: string, entities: Entity[], filteredTypes: EntityType[], override = false) {
    
    let party = entities.filter(e => filteredTypes.includes(e.type));
    party.forEach(e => e.initiative === undefined);
    const existingParties: Encounter[] = getLocalStorageArr(StorageType.Encounter);

    if (!existingParties) {
        setLocalStorageArr(StorageType.Encounter, []);
    } else if (existingParties.find(p => p.name === name)) {
        if (!override) {
            throw new SaveError("A party already exists with that name. Are you sure you want to overwrite it?");
        } else {
            setLocalStorageArr(StorageType.Encounter, [
                ...existingParties.filter(p => p.name !== name),
                { name, party, filteredTypes }
            ]);
        }
    } else {
        setLocalStorageArr(StorageType.Encounter, [...existingParties, { name, party, filteredTypes }]);
    } 
}


export function removeLocalStorageParty(name: string) {
    const parties = getLocalStorageArr(StorageType.Encounter).filter(p => p.name !== name);
    setLocalStorageArr(StorageType.Encounter, [...parties]);
}

export function setLocalStorageTheme(theme: string) {
    setLocalStorage(StorageType.Theme, theme);
}

export function getLocalStorageTheme(): string {
    return getLocalStorage(StorageType.Theme);
}

export function clearLocalStorage() {
    try {
        localStorage.clear();
    } catch(e) {
        console.error(`Error clearing local storage: ${e}`)
    }
}

export function clearLocalStorageLogs() {
    try {
        localStorage.removeItem(StorageType.Logs);
    } catch(e) {
        console.error(`Error clearing local storage: ${e}`)
    }
}

function setLocalStorageArr(name: string, obj: any[]) {
    try {
        localStorage.setItem(name, JSON.stringify(obj));
    } catch(e) {
        console.error(`Error writing ${name} to local storage: ${e}`)
    }
}

function getLocalStorageArr(name: string): any[] {
    try {
        const obj = JSON.parse(localStorage.getItem(name)) as any[];
        return obj ? obj : [];
    } catch(e) {
        console.error(`Error retrieving ${name} from local storage: ${e}`)
        return [];
    }
}

function setLocalStorage(name: string, obj: any) {
    try {
        localStorage.setItem(name, JSON.stringify(obj));
    } catch(e) {
        console.error(`Error writing ${name} to local storage: ${e}`)
    }
}

function getLocalStorage(name: string): any {
    try {
        const obj = JSON.parse(localStorage.getItem(name));
        return obj ? obj : undefined;
    } catch(e) {
        console.error(`Error retrieving ${name} from local storage: ${e}`)
        return undefined;
    }
}

