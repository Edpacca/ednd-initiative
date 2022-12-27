<script lang="ts">
    import { currentLog, currentRound, logs } from "../../store";
    import LogTurn from "./LogTurn.svelte";

    const scrollToBottom = (node, list) => {
        const scroll = () => node.scroll({
            top: node.scrollHeight,
            behavior: "smooth"
        });
        scroll();
        return { update: scroll }
    }
</script>

<div class="log-panel" use:scrollToBottom={$logs}>
    {#if $logs.length > 0}
        {#each Array($currentRound) as round, i}
            <div class="log-round">
                <div class="header text-center">Round {i + 1}</div>
                {#each $logs.filter(l => l.round === i + 1) as log}
                    <LogTurn logEntry={log}/>
                {/each}
            </div>
        {/each}
    {/if}
    {#if $currentLog}
        <div class="current-turn">
            <LogTurn logEntry={$currentLog}/>
        </div>
    {/if}
</div>
<div class="top-mask"></div>

<style>
    .top-mask {
        position: absolute;
        top: 2px;
        right: 2px;
        width: calc(100% - 4px);
        height: 3rem;
        background: linear-gradient(var(--dark-grey) 65%, transparent);
    }
    .log-round {
        padding-top: 0.5rem;
    }

    .log-round:not(:first-child) {
        border-top: 4px solid var(--light-grey);
    }

    .log-panel {
        border: 2px solid var(--primary);
        background-color: var(--dark-grey-90);
        border-radius: var(--border-radius);
        width: 15rem;
        max-height: 93vh;
        overflow-y: scroll;
        position: relative;
        padding-top: 2rem;
    }

    .current-turn {
        border: 2px solid var(--gold);
        border-radius: var(--border-radius);
        filter: drop-shadow(0 0 var(--dropshadow-size) var(--gold));
        background-color: var(--dark-grey);
    }

</style>