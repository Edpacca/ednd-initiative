<script lang="ts">
    import Skull from "../../graphics/icons/skull.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import { CreatureType } from "../../lib/models/creature";
    import MinionHpInput from "../creature/minion/MinionHpInput.svelte";

    export let entity;

    $: isMinion = entity.type === CreatureType.Minion;
    $: isDead = entity.hpCurrent[0] <= 0;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2 && !isDead;
</script>

<div class="svg-fit-container" class:minion-hp-container={isMinion}>
    <NumberInput bind:value={entity.hpCurrent[0]} extraClasses={isBloodied ? "bloodied" : isDead ? "dead" : ""} isHidden={isMinion}/>
    {#if isDead && !isMinion}
        <div class="skull"><Skull/></div>
    {:else if isMinion}
        {#each Array(entity.quantity) as m, i}
            <MinionHpInput index={i} bind:hp={entity.hpCurrent[i]} hpMax={entity.hpMax}/>
        {/each}
    {/if}
</div>