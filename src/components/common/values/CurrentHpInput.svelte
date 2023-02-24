<script lang="ts">
    import Skull from "../../../graphics/icons/skull.svelte";
    import NumberInput from "./NumberInput.svelte";
    import { CreatureType } from "../../../lib/models/creature";
    import MinionHpInput from "../../creature/minion/MinionHpInput.svelte";
    import { appendSumDamageToCurrentLog } from "../../../store";

    export let entity;

    $: isMinion = entity.type === CreatureType.Minion;
    $: isDead = entity.hpCurrent[0] <= 0;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2 && !isDead;

    const logHealthChange = (difference: number, index = 0) => { 
        appendSumDamageToCurrentLog(entity, difference, index);
    }
</script>

<div class="svg-fit-container">
    <NumberInput 
        bind:value={entity.hpCurrent[0]}
        class={isBloodied ? "bloodied" : isDead ? "dead" : ""}
        isHidden={isMinion}
        onValueChange={logHealthChange}
        />
    {#if isDead && !isMinion}
        <div class="skull"><Skull/></div>
    {:else if isMinion}
        {#each Array(entity.quantity) as m, i}
            <MinionHpInput minion_index={i} bind:hp={entity.hpCurrent[i]} hpMax={entity.hpMax} logHealthChange={logHealthChange}/>
        {/each}
    {/if}
</div>