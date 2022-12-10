<script lang="ts">
    import { currentRound, currentEntityIndex, entities, isLocked, currentMinionIndex } from "../../store";
    
    $: max = $entities.length - 1;
    
    const next = () => {
        $currentEntityIndex++;
        if ($currentEntityIndex > max) {
            $currentEntityIndex = 0;
            $currentMinionIndex = 0;
            $currentRound++;
        }
    }

    const previous = () => {
        if ($currentRound === 1 && $currentEntityIndex === 0) return;

        $currentEntityIndex--;
        if ($currentEntityIndex < 0) {
            $currentEntityIndex = max;
            $currentMinionIndex = 0;
            $currentRound = Math.max($currentRound - 1, 1);
        }
    }

    const onArrows = (event: KeyboardEvent) => {
        switch(event.key) {
            case "ArrowLeft":
                previous();
                return;
            case "ArrowRight":
                next();
                return;
            default:
                return;
        }
    }
</script>

<div class="turn-tracker" class:hidden={!$isLocked}>
    <div class="header">Round {$currentRound}</div>
    <div class="tt-buttons flex-row" >
        <button on:click={previous}>{"<"}</button>
        <button on:click={next}>{">"}</button>
    </div>
</div>
<svelte:window on:keydown={e => onArrows(e)}/>

<style>
    .turn-tracker {
        width: fit-content;
    }

    button {
        width: 42px;
        height: 42px;
        background-color: var(--grey);
        border: none;
        border-radius: var(--border-radius);
        font-size: 32px;
        color: var(--white);
    }

    button:hover {
        background-color: var(--light-grey);
    }

    .tt-buttons {
        column-gap: 8px;
    }
</style>