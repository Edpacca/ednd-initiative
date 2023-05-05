<script>
    import Arrow from "../../graphics/icons/arrow.svelte";
    export let isActive = false;
</script>

{#if isActive}
    <div class="indicator-container">
        <div class="active-icon left-side">
            <Arrow/>
        </div>
        <div class=active-initiative>
        </div>
    </div>

{/if}

<style>
    .indicator-container {
        position: absolute;
        height: 100%;
        width: 101%;
        display: flex;
        flex-direction: row;
    }


    .active-initiative {
        position: relative;
        width: 100%;
        top: calc(-1 * var(--table-padding));
        height: 100%;
        background-color: var(--super-dark-grey);
        border: 3px solid var(--gold);
        border-radius: 0.5rem;
        z-index: -1;
        filter: drop-shadow(0 0 0.75rem var(--gold));
    }

    .active-icon {
        position: absolute;
        fill: var(--gold);
        height: 2.5rem;
        padding: 0.625rem;
    }

    .left-side {
        left: -6rem;
        animation: point-L 1.5s ease-in infinite alternate;
    }
</style>