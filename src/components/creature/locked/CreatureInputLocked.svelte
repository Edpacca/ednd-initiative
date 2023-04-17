<script lang="ts">
    import HealthBar from "../../common/values/HealthBar.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import Minions from "../minion/Minions.svelte";
    import LegendaryActionsValue from "../../common/values/LegendaryActionsValue.svelte";
    import ConditionIcon from "../../common/icons/ConditionIcon.svelte";
    import { appendLegendaryActionsToCurrentLog } from "../../../lib/logger";

    export let creature: Creature;
    export let isActive = false;
    export let isSelected = false;
    export let index = 0;
    export let selectedIndex = 0;

    const isMinion = creature.type === CreatureType.Minion;
    const isPlayer = creature.type === CreatureType.Player;
    const isBoss = creature.type === CreatureType.Boss;

    const logLegendaryAction = () => {
        if (isBoss) {
            appendLegendaryActionsToCurrentLog(creature, 1);
        }
    }

    const removeCondition = (condition: string, i: number) => {
        creature.conditions[i] = creature.conditions[i].filter(c => c !== condition);
    }
</script>

<div class="entity-area" class:boss-grid={isBoss}>
    <div class="name-input-container">
        <input 
            bind:value={creature.name}
            type="text"
            class:active={isActive}
            readonly
            class:minion-main-name={creature.type === CreatureType.Minion}
            placeholder={isPlayer ? creature.playerClass : "Creature"}
            on:click={() => isSelected = true}/>
            {#if isMinion}
                <Minions
                    creature={creature}
                    bind:selectedIndex
                    bind:isSelected
                    bind:name={creature.name}
                    bind:quantity={creature.quantity}
                    removeCondition={removeCondition}
                    parentIndex={index}
                    hpMax={creature.hpMax}
                    hpCurrent={creature.hpCurrent}
                    conditions={creature.conditions}/>
            {:else}
                <HealthBar max={creature.hpMax} current={creature.hpCurrent[0]}/>
                {#if creature.conditions[0].length > 0}
                    <div class="conditions">
                        {#each creature.conditions[0] as condition}
                            <button on:click={() => removeCondition(condition, 0)} class="blank-button">
                                <ConditionIcon condition={condition} width="2rem"/>
                            </button>
                        {/each}
                    </div>
                {/if}
            {/if}

    </div>
    {#if isBoss}
        <LegendaryActionsValue bind:value={creature.laCurrent} logUsage={logLegendaryAction}/>
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
        background-color: var(--suepr-dark-grey) !important;
        color: var(--gold) !important;
    }
    
    .boss-grid {
        display: grid;
        grid-template-columns: 1fr 3rem;
        column-gap: 1rem;
    }

</style>