import { activeEntityTurnIndex, currentTheme, entities, isStarted } from "../../../store";

export function reset() {
    entities.set([]);
    currentTheme.set("stone");
    activeEntityTurnIndex.set(0);
    isStarted.set(false);
}