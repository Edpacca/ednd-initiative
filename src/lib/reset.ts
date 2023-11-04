import { activeEntityTurnIndex, currentLogId, currentRound, entities, isLocked, isStarted } from "../store";
import { clearLogs } from "./logger";

export function resetAll() {
    entities.set([]);
    activeEntityTurnIndex.set(0);
    currentRound.set(0);
    isStarted.set(false);
    isLocked.set(false);
    clearLogs();
}

export function resetTurns() {
    activeEntityTurnIndex.set(0);
    currentRound.set(0);
    isStarted.set(false);
    isLocked.set(false);
    clearLogs();
}