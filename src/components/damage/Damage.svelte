<script lang="ts">
    import Blood from "../../graphics/icons/blood.svelte";
    import Heart from "../../graphics/icons/heart.svelte";
    import Skull from "../../graphics/icons/skull.svelte";
    import type { Creature } from "../../lib/models/creature";
    import { FLOATERS } from "../common/floater/animationValue";
    import Floater from "../common/floater/Floater.svelte";
    import type { FocusType } from "../creature/creatureModal/focusType";
    import { appendDamageToCurrentLog } from "../logger/logger";

    export let creature: Creature;
    export let damageInput: HTMLInputElement;
    export let healingInput: HTMLInputElement;
    export let focused: FocusType = "damage";
    export let index = 0;

    let damage: number;
    let healing: number;
    let isSkullHovered = false;

    const applyDamage = () => {
        if (damage) {
            const appliedDamage = damage > creature.hpCurrent[index] ? creature.hpCurrent[index] : damage;
            creature.hpCurrent[index] -= appliedDamage;
            if (damage > appliedDamage) {
                appendDamageToCurrentLog(creature, damage * -1, damage - appliedDamage);
            } else {
                appendDamageToCurrentLog(creature, damage * -1, index);
            }           
            resetDamage();
        } 
    }

    const applyHealing = () => {
        if (healing) {
            creature.hpCurrent[index] += healing;
            appendDamageToCurrentLog(creature, healing, index);
            resetHealing();
        }
    }
    
    const resetDamage = () => damage = undefined;
    const resetHealing = () => healing = undefined;
    const resetDamageAtZero = () => { if (damage === 0) resetDamage(); }
    const resetHealingAtZero = () => { if (healing === 0) resetHealing(); }

    $: damage, resetDamageAtZero();
    $: healing, resetHealingAtZero();

    const submitEnter = (event: KeyboardEvent, type: "damage" | "healing") => {
        if (event.key === "Enter") {
            switch(type) {
                case "damage":
                    applyDamage();
                    break;
                case "healing":
                    applyHealing();
                    break;
            }
        }
    }


</script>

<div class="damage-tool-container">
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
            bind:this={damageInput}
            type="number"
            min={0} bind:value={damage}
            on:input={resetHealing}
            on:focus={() => focused = "damage"}
            on:keydown={e => submitEnter(e, "damage")}/>
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
            bind:this={healingInput}
            id="healing-input"
            type="number"
            min={0} bind:value={healing}
            on:input={resetDamage}
            on:focus={() => focused = "healing"}
            on:keydown={e => submitEnter(e, "healing")}/>
        <button on:click={() => applyHealing()} class:active={focused === "healing"}>Heal</button>
    </div>
    <div class="kill-buttons">
        <button class="kill-button"
        on:mouseenter={() => isSkullHovered = true}
        on:mouseleave={() => isSkullHovered = false}
        on:click={() => creature.hpCurrent[index] = 0}>
        <Skull/>
        {#if isSkullHovered}
            <div class="floaters">
                {#each FLOATERS as floater}
                    <Floater av={floater} color="black"/>
                {/each}
            </div>
        {/if}
        </button>
        <button class:kill={isSkullHovered} on:click={() => creature.hpCurrent[index] = 0}>Kill</button>
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
        font-size: 2rem;
        font-weight: bold;
        z-index: 2;
        background: none;
    }

    .kill-button {
        height: 6rem;
        width: 6rem;
        position: relative;
    }

    .kill-button:hover {
        fill: var(--white);
    }

    .kill {
        color: var(--white);
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
        transition: var(--transition-time);
    }
    .heal {
        fill: var(--green-50);
        transition: var(--transition-time);
    }

    .damage .input-icon {
        bottom: 45px;
    }
    .heal .input-icon {
        top: 0.5rem;
        width: 5rem;
        height: 5rem;
    }

    .damage.active {
        fill: var(--red);
        transition: var(--transition-time);
    }
    .heal.active {
        fill: var(--green);
        transition: var(--transition-time);
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
        transition: var(--transition-time);
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
        top: 1.25rem;
        margin-right: 1.25rem;
    }
</style>
