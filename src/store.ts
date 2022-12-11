import { writable, type Writable } from "svelte/store";
import type { Effect } from "./components/effects/effect";
import type { Entity } from "./components/entity/entity";
import { getLocalStorageEntities, getLocalStorageTheme } from "./lib/persistance";

export const entities: Writable<Entity[]> = writable(getLocalStorageEntities());
export const effects: Writable<Effect[]> = writable([]);
export const isLocked: Writable<boolean> = writable(false);
export const isStarted: Writable<boolean> = writable(false);
export const currentRound: Writable<number> = writable(1);
export const currentEntityIndex: Writable<number> = writable(0);
export const currentMinionIndex: Writable<number> = writable(0);
export const currentTheme: Writable<string> = writable(getLocalStorageTheme() ?? "stone");