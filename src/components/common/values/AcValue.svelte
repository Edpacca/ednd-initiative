<script lang="ts">
    import Shield from "../../../graphics/icons/shield.svelte";
    import NumberStringInput from "./NumberStringInput.svelte";
    export let value;
    let isBonusOpen = false;
    let bonus = 0;
    $: isEnchanted = bonus !== 0;

    const handleClick = () => {
        if (!isBonusOpen) {
            isEnchanted = bonus !== 0 ? true : !isEnchanted
        } else {
            isBonusOpen = false;
        }
    }
</script>

<button class="ac svg-fit-container" class:enchanted={isEnchanted} on:click={handleClick} on:contextmenu|preventDefault={() => isBonusOpen = !isBonusOpen}>
    <div class="svg-fit">
        <Shield/>
    </div>
    <div class="value">{value + bonus}</div>
</button>
{#if isBonusOpen}
    <div class="bonus-popup">
        <NumberStringInput bind:value={bonus} showPlus={true}/>
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

    .bonus-popup {
        position: absolute;
        width: 3rem;
        height: 3rem;
        z-index: 20;
    }

</style>