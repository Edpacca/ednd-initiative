<script lang="ts">
    import { onMount } from "svelte";
import Blood from "../../assets/icons/blood.svelte";
    import Heart from "../../assets/icons/heart.svelte";
    import { Creature } from "../../lib/models/creature";
    import { entities, isLocked, selectedEntityIndex } from "../../store";

    let damage: number;
    let healing: number;
    let damageInputElement: HTMLInputElement;
    let healingInputElement: HTMLInputElement;

    $: currentEntity = $entities[$selectedEntityIndex[0]];

    $: isCreature = currentEntity instanceof Creature;

    const applyDamage = () => {
        if (isCreature && (currentEntity as Creature).hpCurrent && damage) {
            ($entities[$selectedEntityIndex[0]] as Creature).hpCurrent[$selectedEntityIndex[1]] -= damage;
            resetDamage();
        } 
    }

    const applyHealing = () => {
        if (isCreature && healing && (currentEntity as Creature).hpCurrent) {
            ($entities[$selectedEntityIndex[0]] as Creature).hpCurrent[$selectedEntityIndex[1]] += healing;
            resetHealing();
        } 
    }
    
    const resetDamage = () => damage = undefined;
    const resetHealing = () => healing = undefined;
    const resetDamageAtZero = () => { if (damage === 0) resetDamage(); }
    const resetHealingAtZero = () => { if (healing === 0) resetHealing(); }

    $: damage, resetDamageAtZero();
    $: healing, resetHealingAtZero();
    let damageFocused = false;
    let healingFocused = false;

    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const keyboardInput = async (event: KeyboardEvent) => {
        if (event.key === "Tab") {
            if (!damageFocused) {
                document.getElementById("damage-input").focus();
                document.getElementById("healing-input").blur();
                damageFocused = true;
                healingFocused = false;
            } else {
                document.getElementById("healing-input").focus();
                document.getElementById("damage-input").blur();
                healingFocused = true;
                damageFocused = false;
            }
            // if (!damageFocused) {
            //     healingInputElement.blur();
            //     damageInputElement.focus();
            //     console.log("damage");
            // } else {
            //     damageInputElement.blur();
            //     healingInputElement.focus();
            //     console.log("healing");
            // }
        } else if (event.key === "Enter") {
            submitEnter("damage");
        }
        // } else if (!damageFocused && !healingFocused && numbers.includes(event.key)) {
        //     console.log(event.key);
        //     if (!damageFocused) {
        //         damageInputElement.focus();
        //         damageInputElement.value = event.key;
        //     } else if (healingFocused) {
        //         healingInputElement.value = event.key;
        //     }
        // }
    }
    
    const submitEnter = (type: "damage" | "healing") => {
        if (type === "damage") applyDamage();
        else if (type === "healing") applyHealing();
    }
</script>

{#if $isLocked}
    <div class="damage-tool-container">
        <div class="damage relative flex-col">
            <div class="input-icon" class:active={damageFocused}>
                <Blood/>
            </div>
            <input
                id="damage-input"
                bind:this={damageInputElement}
                type="number"
                min={0} bind:value={damage}
                on:input={resetHealing}
                tabindex={0}
                on:keydown={e => keyboardInput(e)}/>
            <button on:click={() => applyDamage()} class:active={!!damage}>Damage</button>
        </div>
        <div class="heal relative flex-col">
            <div class="input-icon" class:active={healingFocused}>
                <Heart/>
            </div>
            <input
                bind:this={healingInputElement}
                id="healing-input"
                type="number"
                min={0} bind:value={healing}
                on:input={resetDamage}
                tabindex={0}
                on:keydown={e => submitEnter("healing")}/>
            <button on:click={() => applyHealing()} class:active={!!healing}>Heal</button>
        </div>
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
