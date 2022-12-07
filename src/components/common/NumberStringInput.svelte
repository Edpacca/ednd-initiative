<script lang="ts">
    import ValueSpinner from "./ValueSpinner.svelte";

    export let value = 0;
    export let showPlus = false;
    export let isHidden = false;
    
    $: valueString = showPlus && value > 0 ? "+"+value : value;
    let isHovered = false;
</script>

<div class="value-container" class:hidden={isHidden} 
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}>
        <input type="text" bind:value={valueString} hidden={isHidden}/>
        <ValueSpinner bind:value isHidden={!isHovered}/>
</div>