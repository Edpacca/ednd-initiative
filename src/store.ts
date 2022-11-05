import { writable, type Writable } from "svelte/store";
import type { Entity } from "./components/entity/entity";

export const entities: Writable<Entity[]> = writable([])