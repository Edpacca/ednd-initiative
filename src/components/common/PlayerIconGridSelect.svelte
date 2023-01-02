<script lang="ts">
    import { PLAYER_CLASSES, type PlayerClass } from "../../lib/models/playerClass";
    import PlayerClassIcon from "./icons/PlayerClassIcon.svelte";

    export let playerClass: PlayerClass;
    export let isOpen = false;

    const handleClick = (pc: PlayerClass) => {
        playerClass = pc;
        isOpen = false;
    }

</script>

{#if isOpen}
    <div class="icon-grid">
        {#each PLAYER_CLASSES as pc}
            <button class="blank-button" on:click={() => handleClick(pc)}>
                <PlayerClassIcon playerClass={pc} width="2rem"/>
            </button>
        {/each}
    </div>
{/if}

<style>
    .icon-grid {
        display: grid;
        grid-template-columns: repeat(5, 2rem);
        background-color: var(--dark-grey-90);
        border-radius: var(--border-radius);
        position: absolute;
        row-gap: 0.5rem;
        column-gap: 0.5rem;
        padding: 0.5rem;
        border: 2px solid var(--gold);
        z-index: var(--z-modal);
        top: 0;
        left: 3.5rem;
    }

    button {
        fill: var(--gold);
        opacity: 0.5;
        padding: 0;
        margin: 0;
        height: 2rem;
        width: 2rem;
    }

    button:hover {
        fill: var(--white);
        opacity: 1;
    }
</style>