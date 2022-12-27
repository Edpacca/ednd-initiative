<script lang="ts">
    import { onMount } from "svelte";
    import { CONDITIONS } from "../../../lib/conditions";
    export let condition: string;
    export let width = "100%";
    export let hasTooltip = true;
    let isHovering = false;
    let position = {x: 0, y: 0}
    let svgElement: SVGSVGElement;

    onMount(async() => {
        const rect = svgElement.getBoundingClientRect();
        position = { x: rect.x, y: rect.y}
    })
</script>


<svg
    class={`${$$props.class}`}
    class:noTooltip={!hasTooltip}
    width={width} height={width}
    viewBox={"0 0 100 100"}
    bind:this={svgElement}
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
    <div class="tooltip" style="left: {position.x}px; top: calc(2rem + {position.y}px);">
        {condition}
    </div>
{/if}

<style>
    svg:hover:not(.noTooltip) {
        opacity: 0.5;
    }
    
    .tooltip {
        position: fixed;
        z-index: 50;
        background-color: var(--dark-grey-90);
        color: var(--white);
        padding: 0.2rem;
        margin: 0.2rem 0;
        text-transform: capitalize;
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