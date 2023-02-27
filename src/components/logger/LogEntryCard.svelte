<script lang="ts">
    import Blood from "../../graphics/icons/blood.svelte";
    import Heart from "../../graphics/icons/heart.svelte";
    import type { Creature } from "../../lib/models/creature";
    import { currentLogId, entities, updateSingleEntity } from "../../store";
    import RemoveButton from "../common/buttons/RemoveButton.svelte";
    import ConditionIcon from "../common/icons/ConditionIcon.svelte";
    import EntityIcon from "../common/icons/EntityIcon.svelte";
    import LegendaryActionsValueIcon from "../common/icons/LegendaryActionsValueIcon.svelte";
    import type { LogEntityAny, LogEntry } from "../../lib/models/logEntry";
    import { getTimeString } from "../../lib/time";

    export let logEntry: LogEntry;
    const timeString = getTimeString(new Date(logEntry.time));
    $: isCurrentLog = logEntry.id === $currentLogId;

    const undoLogAction = (recipient: LogEntityAny) => {
        logEntry.recipients = logEntry.recipients.filter(r => r !== recipient);
        
        switch(recipient.logType) {
            case "damage":
                const damagedEntity = $entities.find(e => e.id === recipient.id) as Creature;
                damagedEntity.hpCurrent[recipient.index] -= recipient.damage;
                updateSingleEntity(damagedEntity);
                return;
            case "condition":
                const conditionedEntity = $entities.find(e => e.id === recipient.id) as Creature;
                conditionedEntity.conditions[recipient.index] = conditionedEntity.conditions[recipient.index]
                    .filter(c => c !== recipient.condition);
                updateSingleEntity(conditionedEntity);
                return;
            case "legendary":
                const legendaryEntity = $entities.find(e => e.id === recipient.id) as Creature;
                legendaryEntity.laCurrent += recipient.actions;
                updateSingleEntity(legendaryEntity);
                return;
            default:
                return;
        }
    }

    export let removeLogEntry: () => void | undefined = undefined;
</script>

<div class="log-entry" class:current-log={isCurrentLog}>
    <div class="log-header" class:current-log-header={!removeLogEntry}>
        <div class="log-icon"><EntityIcon type={logEntry.owner.type} playerClass={logEntry.owner.playerClass}/></div>
        <div class="log-name">{logEntry.owner.name}</div>
        <div class="time-info">
            <div class="time">{timeString}</div>
        </div>
        {#if removeLogEntry !== undefined}
            <RemoveButton onClick={removeLogEntry}/>
        {/if}
    </div>
    {#if logEntry.recipients.length > 0 || logEntry.messages.length > 0}
        <hr>
    {/if}
    <div class="damage-log">
        {#each logEntry.recipients as recipient}
            <div class="log-icon"><EntityIcon type={recipient.type} playerClass={recipient.playerClass}/></div>
            <div class="name">{recipient.name}</div>
            {#if recipient.logType === "damage"}
                {#if recipient.damage > 0}
                    <div class="bold green damage-log-icon">
                        {recipient.damage}
                        <Heart/>
                    </div>
                    {:else}
                    <div class="bold red damage-log-icon">
                        {recipient.damage}
                        <Blood/>
                    </div>
                {/if}
            {:else if recipient.logType === "condition"}
                <div class="log-icon">
                    <ConditionIcon condition={recipient.condition} class="white"/>
                </div>
            {:else if recipient.logType === "legendary"}
                <LegendaryActionsValueIcon value={recipient.actions}/>
            {/if}
            <RemoveButton onClick={() => undoLogAction(recipient)}/>
        {/each}
    </div>
</div>

<style>
    .log-entry:not(:last-child) {
        border-bottom: 2px solid var(--primary);
    }

    .current-log {
        border: 2px solid var(--gold);
        border-radius: var(--border-radius);
        background-color: var(--super-dark-grey);
        padding: 0.5rem 0;
    }

    .log-entry {
        padding: 0.25rem;
    }

    .log-header {
        display: grid;
        grid-template-columns: 20% 4rem 30% 1rem;
        align-items: center;
        column-gap: 0.5rem;
        text-align: left;
    }
    
    .current-log-header {
        grid-template-columns: 20% 1fr 30%;
    }

    .log-icon {
        height: 2rem;
    }

    .damage-log .log-icon {
        height: 1.2rem;
    }

    .damage-log-icon {
        display: flex;
        flex-direction: row;
        column-gap: 0.25rem;
        height: 1rem;
        justify-content: left;
    }

    .log-name {
        font-size: var(--fontsize-L);
        color: var(--gold);
        font-weight: bold;
        text-transform: capitalize;
    }

    hr {
        border: 0;
        border-bottom: 2px solid var(--mid-grey);
        margin: 0.5rem 2rem 0 2rem;
    }

    .damage-log {
        padding: 0.75rem;
        display: grid;
        grid-template-columns: 1.2rem 1fr auto 1rem;
        column-gap: 0.5rem;
        align-items: center;
    }
</style>