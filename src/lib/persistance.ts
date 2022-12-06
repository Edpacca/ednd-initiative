import type { Entity } from "../components/entity/entity";

export function getLocalStorageEntities(): Entity[] {
    return getLocalStorage("entities");
}

export function setLocalStorageEntities(entities: Entity[]) {
    setLocalStorage("entities", entities);
}

export function getLocalStoragePlayerParty(name: string): Entity[] {
    return getLocalStorage(name);
}

export function setLocalStoragePlayerParty(name: string, playerParty: Entity[]) {
    if (name === "entities") {
        throw new Error("Cannot name party entities. 'entities' is a reserved keyword");
    }
    setLocalStorage(name, playerParty);
}

function setLocalStorage(name: string, obj: any[]) {
    try {
        localStorage.setItem(name, JSON.stringify(obj));
    } catch(e) {
        console.error(`Error writing ${name} to local storage: ${e}`)
    }
}

function getLocalStorage(name: string): any[] {
    try {
        const obj = JSON.parse(localStorage.getItem(name)) as any[];
        return obj ? obj : [];
    } catch(e) {
        console.error(`Error retrieving ${name} from local storage: ${e}`)
        return [];
    }
}