<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";
    export let playerClass: PlayerClass;
    export let width = "100%";
    export let hasTooltip = false;
    let isHovered = false;
</script>

<svg
    class={`${$$props.class} relative`}
    width={width} height={width}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}>
    <use href={`icons/classes.svg#${playerClass.toLowerCase()}`}/>
</svg>
{#if hasTooltip && isHovered}
    <div class="tooltip">{playerClass}</div>
{/if}
