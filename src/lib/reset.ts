import { activeEntityTurnIndex, currentTheme, entities, isStarted } from "../store";
import { clearLogs } from "./logger";
export function reset() {
    entities.set([]);
    activeEntityTurnIndex.set(0);
    isStarted.set(false);
    clearLogs();
}