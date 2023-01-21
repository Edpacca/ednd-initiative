<script lang="ts">
    import ArrowPlain from "../../graphics/icons/arrow-plain.svelte";
    import { Creature, CreatureType } from "../../lib/models/creature";
    import { setLocalStorageCurrentLogIndex, setLocalStorageLogs } from "../../lib/persistance";
    import { currentRound, entities, activeEntityTurnIndex, isModalOpen, logs, storeCurrentRound, addLog, currentLogIndex } from "../../store";
    
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

        if ($currentLogIndex === $logs.length - 1) {
            addLog();
        }
        
        $currentLogIndex++;
    }

    const previous = () => {
        if ($currentRound === 1 && $activeEntityTurnIndex === 0) return;

        $activeEntityTurnIndex--;
        if ($activeEntityTurnIndex < 0) {
            $activeEntityTurnIndex = max;
            $currentRound = Math.max($currentRound - 1, 1);
        }
        // $currentLog = $logs[$logs.length - 1];
        // $logs = $logs.slice(0, -1);
        $currentLogIndex = Math.max(0, $currentLogIndex - 1);
        storeCurrentRound();
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
    $: setLocalStorageCurrentLogIndex($currentLogIndex);
</script>

<div class="turn-tracker">
    <div class="header">Round {$currentRound}</div>
    <div class="tt-buttons flex-row" >
        <button on:click={previous}><ArrowPlain class="left"/></button>
        <button on:click={next}><ArrowPlain/></button>
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