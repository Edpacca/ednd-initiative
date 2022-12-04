import { writable, type Writable } from "svelte/store";
import type { Entity } from "./components/entity/entity";

export const entities: Writable<Entity[]> = writable([])
export const isLocked: Writable<boolean> = writable(false);
export const players: Writable<Entity[]> = writable([]);
export const currentRound: Writable<number> = writable(0);