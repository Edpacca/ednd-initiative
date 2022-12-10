<script lang="ts">
    import HealthBar from "../../common/HealthBar.svelte";
    import { EntityType, type Entity } from "../entity";
    import Minions from "../Minions.svelte";

    export let entity: Entity;
    export let isActive = false;

    $: isMinion = entity.type === EntityType.Minion;
    $: isPlayer = entity.type === EntityType.Player;
</script>

<div class="entity-area">
    <div class="name-input-container">
        <input 
            bind:value={entity.name}
            type="text"
            class:active={isActive && !isMinion}
            class:minion-main-name={entity.type === EntityType.Minion}
            placeholder={isPlayer ? entity.class : "Entity"}/>
            {#if isMinion}
            <Minions bind:name={entity.name} bind:quantity={entity.quantity} hpMax={entity.hpMax} hpCurrent={entity.hpCurrent} isActive={isActive}/>
            {:else}
                <HealthBar max={entity.hpMax} current={entity.hpCurrent[0]}/>
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
        background-color: var(--dark-grey);
        color: var(--grey) !important;
    }

    .active, input.active::placeholder  {
        background-color: var(--dark-grey) !important;
        color: var(--gold) !important;
    }
    
</style>