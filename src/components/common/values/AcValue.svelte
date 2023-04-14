<script lang="ts">
    import { scale } from "svelte/transition";
    import ShieldBroken from "../../../graphics/icons/shield-broken.svelte";
    import Shield from "../../../graphics/icons/shield.svelte";
    import Tooltip from "../tooltip/Tooltip.svelte";
    import NumberStringInput from "./NumberStringInput.svelte";
    
    export let value;
    
    let isBonusOpen = false;
    let bonus = 0;
    $: isEnchanted = bonus > 0;
    $: isCursed = bonus < 0;

    const handleClick = () => {
        if (!isBonusOpen) {
            isEnchanted = bonus !== 0 ? true : !isEnchanted
        } else {
            isBonusOpen = false;
        }
    }

    const closeTimeout = async() => {
        setTimeout(() => isBonusOpen = false, 3500);
    }

    $: bonus, closeTimeout();
</script>

<Tooltip text="Armor Class (r-click to add mod)" type="help">
    <button class="ac svg-fit-container" class:enchanted={isEnchanted} class:cursed={isCursed} on:click={handleClick} on:contextmenu|preventDefault={() => isBonusOpen = !isBonusOpen}>
        <div class="svg-fit">
            {#if isCursed}
                <ShieldBroken/>    
            {:else}
                <Shield/>
            {/if}
        </div>
        <div class="value">{value + bonus}</div>
    </button>
</Tooltip>
{#if isBonusOpen}
    <div class="bonus-popup" in:scale out:scale>
        <div class="bonus-text">mod</div>
        <NumberStringInput bind:value={bonus} showPlus={true} class="enchanted-input"/>
    </div>
{/if}

<style>
    .ac {
        fill: var(--light-grey);
        position: relative;
        height: 2.5rem;
        width: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        color: black;
    }
    
    .value {
        font-weight: bold;
        font-size: var(--fontsize-XL);
        z-index: 1;
    }

    .enchanted {
        filter: drop-shadow(0 0 4px aqua);
        fill: aqua;
    }

    .cursed {
        filter: drop-shadow(0 0 4px var(--red));
    }

    .bonus-popup {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        z-index: 20;
    }

    .bonus-text {
        color: aqua;
        font-weight: bold;
        text-align: center;
        background: var(--dark-grey);
        border-radius: var(--border-radius);
    }
</style>