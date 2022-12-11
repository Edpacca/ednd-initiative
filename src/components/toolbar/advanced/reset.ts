import { activeEntityTurnIndex, selectedEntityIndex, currentTheme, entities } from "../../../store";

export function reset() {
    entities.set([]);
    currentTheme.set("stone");
    activeEntityTurnIndex.set(0);
    selectedEntityIndex.set([0, 0]);
}