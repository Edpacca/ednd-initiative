<script lang="ts">
    import Skull from "../../assets/icons/skull.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import { CreatureType } from "../../lib/models/creature";
    import { selectedEntityIndex } from "../../store";
    import MinionHpInput from "../creature/minion/MinionHpInput.svelte";

    export let entity;
    export let isSelected: boolean;

    $: isMinion = entity.type === CreatureType.Minion;
    $: isDead = entity.hpCurrent[0] <= 0;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2 && !isDead;
    $: damageClass = isBloodied ? "bloodied" : isDead ? "dead" : "";
    $: selectedClass = isSelected ? "selected-input" : "";
</script>

<div class="svg-fit-container" class:minion-hp-container={isMinion}>
    <NumberInput bind:value={entity.hpCurrent[0]} extraClasses={`${damageClass} ${selectedClass}`} isHidden={isMinion}/>
    {#if isDead && !isMinion}
        <div class="skull"><Skull/></div>
    {:else if isMinion}
        {#each Array(entity.quantity) as m, i}
            <MinionHpInput index={i} bind:hp={entity.hpCurrent[i]} hpMax={entity.hpMax} isSelected={isSelected && i === $selectedEntityIndex[1]}/>
        {/each}
    {/if}
</div>