<script lang="ts">
    import { currentRound, entities, isLocked } from "../../store";
    export let currentTurn;
    $: max = $entities.length - 1;

    const next = () => {
        currentTurn++;
        if (currentTurn > max) {
            currentTurn = 0;
            $currentRound++;
        }
    }

    const previous = () => {
        currentTurn--;
        if (currentTurn < 0) {
            currentTurn = max;
            $currentRound--;
        }
    }
</script>

<div class:hidden={!$isLocked}>
    <div class="header">Round: {$currentRound}</div>
    <div class="buttons" >
        <button on:click={previous}>{"<"}</button>
        <button on:click={next}>{">"}</button>
    </div>
</div>

<style>
    button {
        width: 42px;
        height: 42px;
        background-color: var(--dark-grey);
        border: none;
        border-radius: 8px;
        font-size: 32px;
        color: var(--white);
    }

    button:hover {
        background-color: var(--light-grey);
    }
</style>