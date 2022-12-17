<script lang="ts">
    import Legendary from "../../graphics/icons/legendary.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    export let valueMax;
    export let valueCurrent;

    const setCurrent = (value) => {
        valueCurrent = value;
    }

    $: setCurrent(valueMax);
</script>

<div class="legendary svg-fit-container">
    <div class="svg-fit">
        <Legendary/>
    </div>
    <NumberInput bind:value={valueMax} extraClasses="blank-input gold" />
</div>

<style>
    .legendary {
        fill: var(--gold);
        position: relative;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>