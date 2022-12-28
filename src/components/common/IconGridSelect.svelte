<script>
    import { PLAYER_CLASSES } from "../../lib/models/playerClass";
    import PlayerClassIcon from "./icons/PlayerClassIcon.svelte";

</script>

<div class="icon-grid">
    {#each PLAYER_CLASSES as playerClass}
        <PlayerClassIcon playerClass={playerClass} width="2rem"/>
    {/each}
</div>

<style>
    .icon-grid {
        display: grid;
        grid-template-columns: repeat(5, 2rem);
        background-color: var(--dark-grey-90);
        border-radius: var(--border-radius);
        position: absolute;
        row-gap: 0.5rem;
        padding: 0.5rem;
        border: 2px solid var(--gold);
        z-index: var(--z-modal);
        top: 0;
        left: 3.5rem;
    }
</style>