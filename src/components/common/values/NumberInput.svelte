<script lang="ts">
    import ValueSpinner from "../buttons/ValueSpinner.svelte";

    export let value = 0;
    export let isHidden = false;
    export let onValueChange: (difference: number) => void = () => {};
    
    let isHovered = false;
</script>

<div class="value-container" class:hidden={isHidden} 
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}>
    <input type="number" class={$$props.class} bind:value={value} hidden={isHidden}/>
    <ValueSpinner bind:value isHidden={!isHovered} onValueChange={onValueChange}/>
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