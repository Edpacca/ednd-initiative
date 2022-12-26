<script lang="ts">
    import Legendary from "../../../graphics/icons/legendary.svelte";
    export let value;
</script>

<div class="legendary svg-fit-container">
    <div class="svg-fit">
        <Legendary/>
    </div>
    <div class="value">{value}</div>
</div>

<style>
    .legendary {
        fill: var(--gold);
        color: var(--gold);
        height: 1.2rem;
        width: 1.2rem;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .value {
        font-weight: bold;
        font-size: var(--fontsize-M);
        z-index: 1;
        color: var(--white);
    }
</style>