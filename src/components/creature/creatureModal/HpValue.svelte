<script lang="ts">
    import Heart from "../../../graphics/icons/heart.svelte";
    export let value;
</script>

<div class="hp svg-fit-container">
    <div class="svg-fit heart-offset">
        <Heart/>
    </div>
    <div class="value">{value}</div>
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
    
    .value {
        font-weight: bold;
        font-size: 20px;
        z-index: 1;
    }

    .heart-offset {
        top: 2px;
    }
</style>