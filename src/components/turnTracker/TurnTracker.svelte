<script lang="ts">
    import ArrowPlain from "../../graphics/icons/arrow-plain.svelte";
    import { Creature, CreatureType } from "../../lib/models/creature";
    import { setLocalStorageCurrentLogId, setLocalStorageLogs } from "../../lib/persistance";
    import { currentRound, entities, activeEntityTurnIndex, isModalOpen, logs, storeCurrentRound, currentLogId } from "../../store";
    import Tooltip from "../common/tooltip/Tooltip.svelte";
    import { updateLogs } from "../../lib/logger";
    
    $: max = $entities.length - 1;
    
    const next = () => {
        $activeEntityTurnIndex++;
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

        storeCurrentRound();
        updateLogs($activeEntityTurnIndex);
    }

    const previous = () => {
        if ($currentRound === 1 && $activeEntityTurnIndex === 0) return;

        $activeEntityTurnIndex--;
        if ($activeEntityTurnIndex < 0) {
            $activeEntityTurnIndex = max;
            $currentRound = Math.max($currentRound - 1, 1);
        }
        
        storeCurrentRound();
        updateLogs($activeEntityTurnIndex);
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

    $: setLocalStorageLogs($logs);
    $: setLocalStorageCurrentLogId($currentLogId);
</script>

<div class="turn-tracker">
    <div class="header">Round {$currentRound}</div>
    <div class="tt-buttons flex-row" >
        <Tooltip text="previous" type="help">
            <button on:click={previous}><ArrowPlain class="left"/></button>
        </Tooltip>
        <Tooltip text="next" type="help">
            <button on:click={next}><ArrowPlain/></button>
    </Tooltip>
    </div>
</div>
<svelte:window on:keydown={e => onArrows(e)}/>

<style>
    .turn-tracker {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        width: 5rem;
        height: 3rem;
        background: none;
        border: none;
        transition: var(--transition-time);
        fill: var(--white);
    }

    button:hover {
       fill: var(--gold);
    }

    .tt-buttons {
        column-gap: 8px;
    }
</style>