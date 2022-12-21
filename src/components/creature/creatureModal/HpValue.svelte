<script lang="ts">
    import Heart from "../../../graphics/icons/heart.svelte";
    import Skull from "../../../graphics/icons/skull.svelte";
    export let value;
    export let valueMax;
</script>

<div class={`hp svg-fit-container ${$$props.class}`} class:bloodied-svg={value <= valueMax / 2}>
    <div class="svg-fit heart-offset">
        {#if value > 0}
            <Heart/>
        {:else}
            <Skull/>
        {/if}
    </div>
    <div class="value">{value > 0 ? value : ""}</div>
</div>

<style>
    .hp {
        fill: var(--secondary);
        position: relative;
        height: 4rem;
        width: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
        bottom: 0.7rem;
    }

    .minion-hp {
        height: var(--input-height);
        width: var(--input-height);
        bottom: 0;
        margin-bottom: var(--healthbar-height);
    }
    
    .value {
        font-weight: bold;
        font-size: var(--fontsize-XL);
        z-index: 1;
    }

    .heart-offset {
        top: 2px;
    }
</style>