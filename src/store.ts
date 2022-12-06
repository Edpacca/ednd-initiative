import { writable, type Writable } from "svelte/store";
import type { Entity } from "./components/entity/entity";
import { PLAYERS } from "./data/players";

export const entities: Writable<Entity[]> = writable(PLAYERS)
export const isLocked: Writable<boolean> = writable(false);
export const isStarted: Writable<boolean> = writable(false);
export const currentRound: Writable<number> = writable(1);
export const currentEntityIndex: Writable<number> = writable(0);