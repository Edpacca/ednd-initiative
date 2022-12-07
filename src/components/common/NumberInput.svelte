<script lang="ts">
    import ValueSpinner from "./ValueSpinner.svelte";

    export let value = 0;
    export let isHidden = false;
    export let extraClasses = "";

    let isHovered = false;
</script>

<div class="value-container" class:hidden={isHidden} 
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}>
    <input type="number" class={extraClasses} bind:value={value} hidden={isHidden}/>
    <ValueSpinner bind:value isHidden={!isHovered}/>
</div>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
</style>