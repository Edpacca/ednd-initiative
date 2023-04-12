<script lang="ts">
    import Legendary from "../../../graphics/icons/legendary.svelte";
    import Tooltip from "../tooltip/Tooltip.svelte";
    export let value;
    export let logUsage: () => void;

    const reduceValue = () => {
        value = Math.max(value - 1, 0);
        logUsage();
    }
</script>

<Tooltip text="use legendary action" type="help">
    <button class="legendary svg-fit-container" on:click={reduceValue} class:spent={value === 0} disabled={value === 0} on:contextmenu|preventDefault={() => value++}>
        <div class="svg-fit">
            <Legendary/>
        </div>
        <div class="value">{value}</div>
    </button>
</Tooltip>


<style>
    .legendary {
        fill: var(--gold);
        color: var(--gold);
        height: 2.5rem;
        width: 2.5rem;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .legendary:hover:not(.spent) {
        fill: var(--white);
        color: var(--white);
    }

    .spent {
        fill: var(--grey);
        color: var(--grey);
    }

    .value {
        font-weight: bold;
        font-size: var(--fontsize-XL);
        z-index: 1;
    }
</style>