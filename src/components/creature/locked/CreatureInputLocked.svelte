<script lang="ts">
    import HealthBar from "../../common/HealthBar.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import Minions from "./Minions.svelte";
    import LegendaryActionsValue from "../../initiativeTable/LegendaryActionsValue.svelte";

    export let creature: Creature;
    export let isActive = false;
    export let isSelected = false;

    $: isMinion = creature.type === CreatureType.Minion;
    $: isPlayer = creature.type === CreatureType.Player;
    $: isBoss = creature.type === CreatureType.Boss;

</script>

<div class="entity-area" class:boss-grid={isBoss}>
    <div class="name-input-container">
        <input 
            bind:value={creature.name}
            type="text"
            class:active={isActive}
            disabled
            class:minion-main-name={creature.type === CreatureType.Minion}
            placeholder={isPlayer ? creature.class : "Creature"}
            on:click={() => isSelected = true}/>
            {#if isMinion}
                <Minions 
                    bind:name={creature.name}
                    bind:quantity={creature.quantity}
                    hpMax={creature.hpMax}
                    hpCurrent={creature.hpCurrent}/>
            {:else}
                <HealthBar max={creature.hpMax} current={creature.hpCurrent[0]}/>
            {/if}
    </div>
    {#if isBoss}
        <LegendaryActionsValue bind:value={creature.laCurrent}/>
    {/if}
</div>


<style>

    .name-input-container {
        position: relative;
    }
    
    input[type="text"] {
        font-style: italic;
        background-color: var(--grey);
        color: var(--white);
    }
    
    input::placeholder {
        color: var(--white);
    }

    .entity-area {
        width: 100%;    
    }

    .minion-main-name {
        background-color: var(--dark-grey) !important;
        color: var(--grey) !important;
    }

    .active, input.active::placeholder  {
        background-color: var(--dark-grey) !important;
        color: var(--gold) !important;
    }
    
    .boss-grid {
        display: grid;
        grid-template-columns: 1fr 3rem;
        column-gap: 1rem;
    }
</style>