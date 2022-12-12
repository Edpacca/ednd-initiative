<script lang="ts">
    import HealthBar from "../../common/HealthBar.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import Minions from "./Minions.svelte";
    import { selectedEntityIndex, selectEntityInput } from "../../../store";

    export let creature: Creature;
    export let isActive = false;
    export let index: number
    export let isSelected: boolean;

    $: isMinion = creature.type === CreatureType.Minion;
    $: isPlayer = creature.type === CreatureType.Player;

</script>

<div class="entity-area">
    <div class="name-input-container">
        <input 
            bind:value={creature.name}
            type="text"
            class:active={isActive}
            class:minion-main-name={creature.type === CreatureType.Minion}
            placeholder={isPlayer ? creature.class : "Creature"}
            class:selected-input={isSelected}
            on:click={() => selectEntityInput([index, 0])}/>
            {#if isMinion}
            <Minions bind:name={creature.name} bind:quantity={creature.quantity} hpMax={creature.hpMax} hpCurrent={creature.hpCurrent} index={index}/>
            {:else}
                <HealthBar max={creature.hpMax} current={creature.hpCurrent[0]}/>
            {/if}
    </div>
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
    
</style>