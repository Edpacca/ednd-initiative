import { writable, type Writable } from "svelte/store";
import { getLocalStorageEntities, getLocalStorageTheme } from "./lib/persistance";
import type { Entity } from "./models/entity";

export const entities: Writable<Entity[]> = writable(getLocalStorageEntities());
export const isLocked: Writable<boolean> = writable(false);
export const isStarted: Writable<boolean> = writable(false);
export const currentRound: Writable<number> = writable(1);
export const activeEntityTurnIndex: Writable<number> = writable(0);
export const selectedEntityIndex: Writable<[number, number]> = writable([0, 0]);
export const currentTheme: Writable<string> = writable(getLocalStorageTheme() ?? "stone");