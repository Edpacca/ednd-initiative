import { activeEntityTurnIndex, currentTheme, entities } from "../../../store";

export function reset() {
    entities.set([]);
    currentTheme.set("stone");
    activeEntityTurnIndex.set(0);
}