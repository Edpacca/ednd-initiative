<script lang="ts">
    import { Creature, CreatureType } from "../../lib/models/creature";
    import { currentRound, entities, activeEntityTurnIndex, isModalOpen, logs, currentLog, storeCurrentLog } from "../../store";
    import { LogEntry } from "../logger/logEntry";
    
    $: max = $entities.length - 1;
    
    const next = () => {
        $activeEntityTurnIndex++;
        storeCurrentLog();
        if ($activeEntityTurnIndex > max) {
            $activeEntityTurnIndex = 0;
            $currentRound++;
            $entities = $entities.map(e => {
                if (e.type === CreatureType.Boss) {
                    (e as Creature).laCurrent = (e as Creature).laMax;
                }

                return e;
            });
        }
    }

    const previous = () => {
        if ($currentRound === 1 && $activeEntityTurnIndex === 0) return;

        $activeEntityTurnIndex--;
        if ($activeEntityTurnIndex < 0) {
            $activeEntityTurnIndex = max;
            $currentRound = Math.max($currentRound - 1, 1);
        }
    }

    const onArrows = (event: KeyboardEvent) => {
        if (!$isModalOpen) {
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
    }
</script>

<div class="turn-tracker">
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
        width: 3rem;
        height: 3rem;
        background-color: var(--grey);
        border: none;
        border-radius: var(--border-radius);
        font-size: 2rem;
        color: var(--white);
    }

    button:hover {
        background-color: var(--light-grey);
    }

    .tt-buttons {
        column-gap: 8px;
    }
</style>