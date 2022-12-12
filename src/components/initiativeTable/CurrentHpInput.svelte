<script lang="ts">
    import Skull from "../../assets/icons/skull.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import { CreatureType } from "../../lib/models/creature";
    import { selectedEntityIndex } from "../../store";
    export let entity;
    export let isSelected: boolean;
    $: isMinion = entity.type === CreatureType.Minion;
    $: isDead = entity.hpCurrent[0] <= 0;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2 && !isDead;
    $: damageClass = isBloodied ? "bloodied" : isDead ? "dead" : "";
    $: selectedClass = isSelected ? "selected-input" : "";
    const getMinionCssClass = (index: number) => {
        const dead = entity.hpCurrent[index] <= 0;
        const bloodied = entity.hpCurrent[index] <= entity.hpMax / 2 && !dead;
        const damageClass = bloodied ? "minion-input bloodied" : dead ? "dead" : "minion-hp-input";
        const selectClass = isSelected && $selectedEntityIndex[1] === index ? "selected-input" : "";
        return selectClass ? `${damageClass} ${selectClass}` : damageClass;
    }
</script>

<div class="svg-fit-container" class:minion-hp-container={isMinion}>
    <NumberInput bind:value={entity.hpCurrent[0]} extraClasses={`${damageClass} ${selectedClass}`} isHidden={isMinion}/>
    {#if isDead}
        <div class="skull"><Skull/></div>
    {:else if isMinion}
        {#each Array(entity.quantity) as m, i}
            <NumberInput bind:value={entity.hpCurrent[i]} extraClasses={getMinionCssClass(i)}/>
            <div class="spacer"></div>
            {#if entity.hpCurrent[i] <= 0}
                <div class="skull minion-skull" style={`--i: ${i + 1}`}><Skull/></div>
            {/if}
        {/each}
    {/if}
</div>

<style>
    .skull {
        position: absolute;
        height: 2.5rem;
        z-index: 5;
        top: 0;
        fill: var(--secondary);
    }

    .minion-skull {
        top: calc(var(--i) * 2.5rem);  
    }

    .spacer {
        height: var(--healthbar-height);
    }
</style>