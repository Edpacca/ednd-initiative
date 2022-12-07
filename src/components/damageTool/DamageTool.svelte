<script lang="ts">
    import Blood from "../../assets/icons/blood.svelte";
    import Heart from "../../assets/icons/heart.svelte";
    import { currentEntityIndex, entities, isLocked } from "../../store";

    let damage: number;
    let healing: number;

    const applyDamage = () => {
        const currentHp = $entities[$currentEntityIndex].hpCurrent;
        console.log(currentHp);
        if (damage && currentHp) {
            $entities[$currentEntityIndex].hpCurrent = currentHp - damage;
        } 
    }

    const applyHealing = () => {
        if (!!healing) $entities[$currentEntityIndex].hpCurrent += healing;
    }
    
    const resetDamage = () => damage = undefined;
    const resetHealing = () => healing = undefined;

</script>

{#if $isLocked}
    <div class="damage-tool-container">
        <div class="damage relative flex-col">
            <div class="input-icon" class:active={!!damage}>
                <Blood/>
            </div>
            <input type="number" bind:value={damage} on:input={resetHealing}/>
            <button on:click={() => applyDamage()} class:active={!!damage}>Damage</button>
        </div>
        <div class="heal relative flex-col">
            <div class="input-icon" class:active={!!healing}>
                <Heart/>
            </div>
            <input type="number" bind:value={healing} on:input={resetDamage}/>
            <button on:click={() => applyHealing()} class:active={!!healing}>Heal</button>
        </div>
        <!-- <button on:click={apply}></button> -->
    </div>
{/if}

<style>

    .damage-tool-container {
        display: flex;
        flex-direction: row;
        row-gap: 1em;
        align-items: center;
        column-gap: 8px;
    }

    input {
        height: 6rem;
        width: 6rem;
        font-size: 34px;
        font-weight: bold;
        z-index: 1;
        background: none;
    }

    input:focus {
        outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .input-icon {
        position: absolute;
        width: 6rem;
        height: 6rem;
        z-index: -1;
        stroke-width: 5px;
    }

    .damage {
        fill: var(--red-50);
        stroke: var(--dark-red);
    }
    .heal {
        fill: var(--green-50);
        stroke: var(--dark-green);
    }

    .damage .input-icon {
        bottom: 45px;
    }
    .heal .input-icon {
        top: 2px;
    }

    .damage .input-icon.active {
        fill: var(--red);
    }
    .heal .input-icon.active {
        fill: var(--green);
    }

    .damage input {
        color: var(--dark-red);
    }
    .heal input {
        color: var(--dark-green);
    }

    button {
        font-weight: bold;
        font-size: 16px;
        background: none;
        border: none;
        width: 100%;
        height: 2rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button.active {
        cursor: pointer;
    }

    .damage > button {
        color: var(--red);
    }

    .heal > button {
        color: var(--green);
    }

    .damage > button.active {
        background: var(--dark-red);
        border: 3px solid var(--red);
    }
    .heal > button.active {
        background: var(--dark-green);
        border: 3px solid var(--green);
    }

</style>
