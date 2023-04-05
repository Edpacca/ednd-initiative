<script lang="ts">
    import { CONDITIONS } from "../../../lib/conditions";

    export let condition: string;
    export let width = "100%";
    export let hasTooltip = true;
    let isHovering = false;
</script>


<svg
    class={`${$$props.class}`}
    class:noTooltip={!hasTooltip}
    width={width} height={width}
    viewBox={"0 0 100 100"}
    on:mouseenter={() => isHovering = true}
    on:mouseleave={() => isHovering = false}>
    {#if CONDITIONS.includes(condition)}
        <use href={`icons/conditions.svg#${condition}`} />
    {:else}
        <polygon points="50,3 92,25 92,75 50,97 8,75 8,25"/>
        <text x="50" y="50" dominant-baseline="central" text-anchor="middle">{condition.slice(0, 2)}</text>
    {/if}
</svg>

{#if hasTooltip && isHovering}
    <div class="tooltip">
        {condition}
    </div>
{/if}

<style>
    svg:hover:not(.noTooltip) {
        opacity: 0.5;
    }
    
    text {
        stroke: var(--white);
        font-size: 3rem;
    }
    
    polygon {
        stroke: var(--light-grey);
        stroke-width: 4px;
        fill: none;
    }
</style>