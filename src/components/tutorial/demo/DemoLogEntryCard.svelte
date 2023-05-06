<script>
    import { Creature, CreatureType } from "../../../lib/models/creature";
    import { LogEntry } from "../../../lib/models/logEntry";
    import LogEntryCard from "../../logger/LogEntryCard.svelte";
    
    const testPlayer = new Creature(CreatureType.Player);
    const testMinion = new Creature(CreatureType.Minion);
    const testBoss = new Creature(CreatureType.Boss);
    const testEnemy = new Creature(CreatureType.Enemy);
    const testLog = new LogEntry(testPlayer, 1);
    testLog.addLogEntityDamage(testMinion, -5, 1);
    testLog.addLogEntityDamage(testMinion, 5, 2);
    testLog.addLogEntityCondition(testEnemy, "blinded");
    testLog.addLogEntityLegendaryActions(testBoss, 2);
</script>

<div class="log-round">
<div class="header text-center">Round {1}</div>
    <LogEntryCard logEntry={testLog} removeLogEntry={() => {}}/>
</div>

<style>
    .log-round {
        padding-top: 0.5rem;
        border: 2px solid var(--white);
        border-radius: var(--border-radius);
        padding: var(--margin) var(--padding);
        width: 50%;
        margin: auto;
    }
</style>