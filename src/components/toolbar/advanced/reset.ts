import { currentEntityIndex, currentMinionIndex, currentTheme, entities } from "../../../store";

export function reset() {
    entities.set([]);
    currentTheme.set("stone");
    currentEntityIndex.set(0);
    currentMinionIndex.set(0);
}