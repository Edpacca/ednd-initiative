import { activeEntityTurnIndex, currentTheme, entities, isStarted } from "../../../store";
export function reset() {
    entities.set([]);
    activeEntityTurnIndex.set(0);
    isStarted.set(false);
}