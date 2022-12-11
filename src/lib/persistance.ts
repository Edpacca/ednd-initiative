import type { Entity, EntityType } from "../components/entity/entity";
import type { Party } from "../components/toolbar/save/Party";

export class SaveError extends Error {}

export function getLocalStorageEntities(): Entity[] {
    return getLocalStorageArr("entities");
}

export function setLocalStorageEntities(entities: Entity[]) {
    setLocalStorageArr("entities", entities);
}

export function getLocalStorageParties(): Party[] {
    return getLocalStorageArr("parties");
}

export function getLocalStorageParty(name: string): Party | undefined {
    return getLocalStorageParties().find(p => p.name === name);
}

export function setLocalStorageParty(name: string, entities: Entity[], filteredTypes: EntityType[], override = false) {
    
    let party = entities.filter(e => filteredTypes.includes(e.type));
    party.forEach(e => e.initiative === undefined);
    const existingParties: Party[] = getLocalStorageArr("parties");

    if (!existingParties) {
        setLocalStorageArr("parties", []);
    } else if (existingParties.find(p => p.name === name)) {
        if (!override) {
            throw new SaveError("A party already exists with that name. Are you sure you want to overwrite it?");
        } else {
            setLocalStorageArr("parties", [
                ...existingParties.filter(p => p.name !== name),
                { name, party, filteredTypes }
            ]);
        }
    } else {
        setLocalStorageArr("parties", [...existingParties, { name, party, filteredTypes }]);
    } 
}

export function removeLocalStorageParty(name: string) {
    const parties = getLocalStorageArr("parties").filter(p => p.name !== name);
    setLocalStorageArr("parties", [...parties]);
}

export function setLocalStorageTheme(theme: string) {
    setLocalStorage("theme", theme);
}

export function getLocalStorageTheme(): string {
    return getLocalStorage("theme");
}

export function clearLocalStorage() {
    try {
        localStorage.clear();
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

