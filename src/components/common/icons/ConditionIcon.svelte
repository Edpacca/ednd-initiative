<script>
    export let condition;
    export let width = "100%";
    export let hasTooltip = true;
    let isHovering = false;
</script>

<svg
    class={`${$$props.class} relative`}
    width={width} height={width}
    on:mouseenter={() => isHovering = true}
    on:mouseleave={() => isHovering = false}>
    <use href={`conditions/conditions.svg#${condition}`} />
</svg>

{#if hasTooltip && isHovering}
    <div class="tooltip">
        {condition}
    </div>
{/if}

<style>
    svg:hover {
        opacity: 0.5;
    }
    .tooltip {
        position: fixed;
        z-index: 50;
        background-color: var(--dark-grey-90);
        color: var(--white);
        padding: 0.2rem;
    }
</style>