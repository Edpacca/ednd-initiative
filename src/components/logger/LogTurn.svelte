<script lang="ts">
    import EntityIcon from "../common/icons/EntityIcon.svelte";
    import type { LogEntry } from "./logEntry";
    export let logEntry: LogEntry;

    const timeString = `${logEntry.time.getHours()}:${logEntry.time.getMinutes()}:${logEntry.time.getSeconds()}`;
    
</script>

<div class="log-entry">
    <div class="log-header">
        <div class="log-icon"><EntityIcon type={logEntry.owner.type}/></div>
        <div class="log-name">{logEntry.owner.name}</div>
        <div class="time-info">
            <div>Round {logEntry.round}</div>
            <div class="time">{timeString}</div>
        </div>
    </div>
    <hr>

</div>

<style>
    .log-entry {
        border: 2px solid var(--primary);
        padding: 0.25rem;
    }

    .log-header {
        display: grid;
        grid-template-columns: 20% 1fr 20%;
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
        border-bottom: 2px solid var(--primary);
    }
</style>