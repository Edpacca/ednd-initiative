<script lang="ts">
    import Blood from "../../graphics/icons/blood.svelte";
    import Heart from "../../graphics/icons/heart.svelte";
    import Legendary from "../../graphics/icons/legendary.svelte";
    import ConditionIcon from "../common/icons/ConditionIcon.svelte";
import EntityIcon from "../common/icons/EntityIcon.svelte";
    import type { LogEntry } from "./logEntry";
    export let logEntry: LogEntry;
    const time = new Date(logEntry.time);
    const timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
</script>

<div class="log-entry">
    <div class="log-header">
        <div class="log-icon"><EntityIcon type={logEntry.owner.type} playerClass={logEntry.owner.playerClass}/></div>
        <div class="log-name">{logEntry.owner.name}</div>
        <div class="time-info">
            <div class="time">{timeString}</div>
        </div>
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
                    <div class="bold green flex-row mini-icon">
                        {recipient.damage}
                        <Heart/>
                    </div>
                    {:else}
                    <div class="bold red flex-row mini-icon">
                        {recipient.damage}
                        <Blood/>
                    </div>
                {/if}
            {:else if recipient.logType === "legendary"}
                <div>
                    {recipient.actions}
                    <Legendary/>
                </div>
            {:else if recipient.logType === "condition"}
                <div class="flex-row">
                    {#each recipient.conditions as condition}
                        <ConditionIcon condition={condition}/>
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
    .log-entry {
        border-bottom: 2px solid var(--primary);
        padding: 0.25rem;
    }

    .log-header {
        display: grid;
        grid-template-columns: 20% 1fr 30%;
        align-items: center;
        column-gap: 0.5rem;
    }

    .log-icon {
        height: 2rem;
    }

    .damage-log .log-icon {
        height: 1.2rem;
    }

    .mini-icon {
        height: 1rem;
    }

    .log-name {
        font-size: var(--fontsize-L);
        color: var(--gold);
        font-weight: bold;
        text-transform: capitalize;
    }

    hr {
        border: 0;
        border-bottom: 2px solid var(--grey);
        margin: 0 2rem;
    }

    .damage-log {
        padding: 0.75rem;
        display: grid;
        grid-template-columns: 1.2rem 1fr 20%;
        column-gap: 0.5rem;

    }
</style>