<script lang="ts">
    import EntityIcon from "../common/icons/EntityIcon.svelte";
    import type { LogEntry } from "./logEntry";
    export let logEntry: LogEntry;

    const timeString = `${logEntry.time.getHours()}:${logEntry.time.getMinutes()}:${logEntry.time.getSeconds()}`;
</script>

<div class="log-entry">
    <div class="log-header">
        <div class="log-icon"><EntityIcon type={logEntry.owner.type} playerClass={logEntry.owner.playerClass}/></div>
        <div class="log-name">{logEntry.owner.name}</div>
        <div class="time-info">
            <div>Round {logEntry.round}</div>
            <div class="time">{timeString}</div>
        </div>
    </div>
    <hr>
    <div class="damage-log">
        {#each logEntry.recipients as recipient}
            <div><EntityIcon type={recipient.type} playerClass={recipient.playerClass}/></div>
            <div>{recipient.name}</div>
            <div class="bold" class:red={recipient.damage < 0} class:green={recipient.damage > 0}>{recipient.damage}</div>
        {/each}
    </div>
</div>

<style>
    .log-entry {
        border: 2px solid var(--primary);
        padding: 0.25rem;
    }

    .log-header {
        display: grid;
        grid-template-columns: 20% 1fr 30%;
    }

    .log-icon {
        height: 2rem;
    }

    .log-name {
        font-size: var(--fontsize-L);
        color: var(--gold);
        font-weight: bold;
    }

    hr {
        border: 0;
        border-bottom: 2px solid var(--light-grey);
    }

    .damage-log {
        display: grid;
        grid-template-columns: 1.2rem 1fr 5rem;
        column-gap: 0.5rem;
        text-align: right;
    }
</style>