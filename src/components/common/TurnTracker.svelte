<script lang="ts">
    import { currentRound, currentEntityIndex, entities, isLocked } from "../../store";
    $: max = $entities.length - 1;

    const next = () => {
        $currentEntityIndex++;
        if ($currentEntityIndex > max) {
            $currentEntityIndex = 0;
            $currentRound++;
        }
    }

    const previous = () => {
        if ($currentRound === 1 && $currentEntityIndex === 0) return;

        $currentEntityIndex--;
        if ($currentEntityIndex < 0) {
            $currentEntityIndex = max;
            $currentRound = Math.max($currentRound - 1, 1);
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
        background-color: var(--grey);
        border: none;
        border-radius: 8px;
        font-size: 32px;
        color: var(--white);
    }

    button:hover {
        background-color: var(--light-grey);
    }
</style>