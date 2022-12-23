<script>
    import { logs } from "../../store";
    import LogTurn from "./LogTurn.svelte";
</script>

<div class="log-panel">
    {#each $logs as log}
        <LogTurn logEntry={log}/>
    {/each}
</div>

<style>
    .log-panel {
        border: 2px solid var(--primary);
        background-color: var(--dark-grey-90);
        width: 15rem;
        position: absolute;
        top: 0;
        right: 0;
        max-height: 90vh;
        overflow-y: scroll;
    }
</style>