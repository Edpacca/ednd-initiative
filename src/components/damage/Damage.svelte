<script lang="ts">
    import Blood from "../../graphics/icons/blood.svelte";
    import Heart from "../../graphics/icons/heart.svelte";
    import type { Creature } from "../../lib/models/creature";
    import { FLOATERS } from "../common/floater/animationValue";
    import Floater from "../common/floater/Floater.svelte";

    export let creature: Creature;

    let damage: number;
    let healing: number;
    let damageInputElement: HTMLInputElement;
    let healingInputElement: HTMLInputElement;
    let focused: "damage" | "healing" = "damage";

    const applyDamage = () => {
        if (damage) {
            creature.hpCurrent[0] -= damage;
            resetDamage();
        } 
    }

    const applyHealing = () => {
        if (healing) {
            creature.hpCurrent[0] += healing;
            resetHealing();
        }
    }
    
    const resetDamage = () => damage = undefined;
    const resetHealing = () => healing = undefined;
    const resetDamageAtZero = () => { if (damage === 0) resetDamage(); }
    const resetHealingAtZero = () => { if (healing === 0) resetHealing(); }

    $: damage, resetDamageAtZero();
    $: healing, resetHealingAtZero();

    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const keyboardInput = async (event: KeyboardEvent) => {
        if (event.key === "Tab" || numbers.includes(event.key)) {
            if (focused === "healing") {
                document.getElementById("damage-input").focus();
                document.getElementById("healing-input").blur();
                focused = "damage"
            } else if (focused === "damage") {
                document.getElementById("healing-input").focus();
                document.getElementById("damage-input").blur();
                focused = "healing"
            }
        } else if (event.key === "Enter") {
            submitEnter(focused);
        }
    }
    
    const submitEnter = (type: "damage" | "healing") => {
        if (type === "damage") applyDamage();
        else applyHealing();
    }
</script>

<div class="damage-tool-container" on:keydown={e => keyboardInput(e)}>
    <div class="damage relative flex-col" class:active={focused === "damage"}>
        <div class="input-icon">
            <Blood/>
        </div>
        {#if focused === "damage"}
            <div class="floaters">
                {#each FLOATERS as floater}
                    <Floater av={floater} color="darkred"/>
                {/each}
            </div>
        {/if}
        <input
            class="damage-input"
            id="damage-input"
            bind:this={damageInputElement}
            type="number"
            min={0} bind:value={damage}
            on:input={resetHealing}
            on:click={() => focused = "damage"}
            tabindex={0}/>
        <button on:click={() => applyDamage()} class:active={focused === "damage"}>Damage</button>
    </div>
    <div class="heal relative flex-col" class:active={focused === "healing"}>
        <div class="input-icon">
            <Heart/>
        </div>
        {#if focused === "healing"}
            <div class="floaters">
                {#each FLOATERS as floater}
                    <Floater av={floater} color="green"/>
                {/each}
            </div>
        {/if}
        <input
            class="damage-input"
            bind:this={healingInputElement}
            id="healing-input"
            type="number"
            min={0} bind:value={healing}
            on:input={resetDamage}
            on:click={() => focused = "healing"}
            tabindex={0}/>
        <button on:click={() => applyHealing()} class:active={focused === "healing"}>Heal</button>
    </div>
</div>

<style>

    .damage-tool-container {
        display: flex;
        flex-direction: row;
        row-gap: 1em;
        align-items: center;
        column-gap: 8px;
    }

    .damage-input {
        height: 6rem;
        width: 6rem;
        font-size: 34px;
        font-weight: bold;
        z-index: 2;
        background: none;
    }

    .damage-input:focus {
        outline: none;
    }

    .damage-input:hover {
        background: none !important;
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
        z-index: 1;
    }

    .damage {
        fill: var(--red-50);
    }
    .heal {
        fill: var(--green-50);
    }

    .damage .input-icon {
        bottom: 45px;
    }
    .heal .input-icon {
        top: 8px;
        width: 5rem;
        height: 5rem;
    }

    .damage.active {
        fill: var(--red);
    }
    .heal.active {
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
        border-radius: var(--border-radius);
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button.active {
        cursor: pointer;
        outline: none;
    }

    .damage > button {
        color: var(--red-50);
    }

    .heal > button {
        color: var(--green-50);
    }

    .damage > button.active {
        background: var(--dark-red);
        border: 3px solid var(--red);
        color: var(--red);
    }
    .heal > button.active {
        background: var(--dark-green);
        border: 3px solid var(--green);
        color: var(--green);
    }

    .floaters {
        z-index: 1;
        position: absolute;
        top: 20px;
        margin-right: 20px;
    }
</style>
