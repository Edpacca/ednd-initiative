<script lang="ts">
    import Shield from "../../graphics/icons/shield.svelte";
    export let value;
    let isEnchanted = false;
</script>

<button class="ac svg-fit-container" class:enchanted={isEnchanted} on:click={() => isEnchanted = !isEnchanted}>
    <div class="svg-fit">
        <Shield/>
    </div>
    <div class="value">{value}</div>
</button>

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
        font-size: 20px;
        z-index: 1;
    }

    .enchanted {
        filter: drop-shadow(0 0 4px aqua);
        fill: aqua;
    }

</style>