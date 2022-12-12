<script lang="ts">
    import Skull from "../../assets/icons/skull.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import { CreatureType } from "../../lib/models/creature";
    export let entity;
    $: isMinion = entity.type === CreatureType.Minion;
    $: isDead = entity.hpCurrent <= 0;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2 && !isDead;
    $: extraClass = isBloodied ? "bloodied" : isDead ? "dead" : "";

    const getMinionCssClass = (hpCurrent: number) => {
        const dead = hpCurrent <= 0;
        const bloodied = hpCurrent <= entity.hpMax / 2 && !dead;
        return bloodied ? "minion-input bloodied" : dead ? "dead" : "minion-input";
    }
</script>

<div class="svg-fit-container">
    <NumberInput bind:value={entity.hpCurrent[0]} extraClasses={extraClass} isHidden={isMinion}/>
    {#if isDead}
        <div class="skull"><Skull/></div>
    {:else if isMinion}
        {#each Array(entity.quantity) as m, i}
            <NumberInput bind:value={entity.hpCurrent[i]} extraClasses={getMinionCssClass(entity.hpCurrent[i])}/>
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
</style>