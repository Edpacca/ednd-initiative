<script lang="ts">
    import ValueSpinner from "../common/buttons/ValueSpinner.svelte";
    export let value = 0;
    export let extraClasses = "";
    let isHovered = false;
    
</script>

<div class="effect-value-container"
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}>
    <input type="number" class={`effect-counter-input ${extraClasses}`} bind:value={value} on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}/>
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

    .effect-value-container {
        position: relative;
        display: flex;
        flex-direction: row;
    }
</style>