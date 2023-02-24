import { get } from "svelte/store";
import { logs, currentLogId, addNewLog, currentRound, entities } from "../../store";

// to be called when the currentEntityIndex has changed
export function updateLogs(activeEntityTurnIndex: number) {
    const logEntries = get(logs);
    const latestEntityId = get(entities)[activeEntityTurnIndex].id
    const thisRound = get(currentRound);
    const currentRoundLogs = logEntries.filter(l => l.round === thisRound);
    const activeEntityTurnLog = currentRoundLogs.find(l => l.owner.id === latestEntityId)
    // if the current entity has already had a turn
    if (activeEntityTurnLog) {
        currentLogId.set(activeEntityTurnLog.id)
    } else {
        addNewLog();
    }
}