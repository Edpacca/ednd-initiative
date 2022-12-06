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
        <button class="damage relative" on:click={() => applyDamage()}>
            <div class="input-icon" class:active={!!damage}>
                <Blood/>
            </div>
            <input type="number" bind:value={damage} on:input={resetHealing}/>
        </button>
        <button class="heal relative" on:click={() => applyHealing()}>
            <div class="input-icon" class:active={!!healing}>
                <Heart/>
            </div>
            <input type="number" bind:value={healing} on:input={resetDamage}/>
        </button>
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

    button {
        background: none;
        border: none;
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
        fill: var(--red);
        stroke: var(--dark-red);
    }

    .damage .input-icon {
        bottom: 10px;
    }

    .damage input {
        color: var(--dark-red);
    }

    .damage:hover .active {
        fill: var(--dark-red);
        stroke: var(--red);
    }

    .damage:hover .active+input {
        cursor: pointer;
        color: var(--white);
    }

    .heal {
        color: var(--dark-green);
        fill: var(--green);
        stroke: var(--dark-green);
    }

    .heal .input-icon {
        top: 2px;
    }

    .heal input {
        color: var(--dark-green);
    }

    .heal:hover .active {
        fill: var(--dark-green);
        stroke: var(--green);
    }

    .heal:hover .active+input {
        cursor: pointer;
        color: var(--white);
    }

</style>
