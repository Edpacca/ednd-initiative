<script lang="ts">
    import Shield from "../../graphics/icons/shield.svelte";
    export let value;
</script>

<div class="ac svg-fit-container">
    <div class="svg-fit">
        <Shield/>
    </div>
    <div class="value">{value}</div>
</div>

<style>
    .ac {
        fill: var(--light-grey);
        position: relative;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .value {
        color: black;
        font-weight: bold;
        font-size: 20px;
        z-index: 1;
    }
</style>