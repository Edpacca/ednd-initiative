<script lang="ts">
    import { fade } from "svelte/transition";
    import type { IconDescription } from "../../../lib/models/iconDescription";
    import { hasHelpTooltips, hasInfoTooltips } from "../../../store";
    import IconControl from "./IconControl.svelte";
	
	export let type: "info" | "help";
	export let text = "";
	export let capitalise = false;
	export let controls: IconDescription[] = []

	const delayTime = type === "help" ? 800 : 0;
	let isHovered = false;
	let x;
	let y;

	$: canShow = type === "help" && $hasHelpTooltips || type === "info" && $hasInfoTooltips;

	const mouseOver = (event) => {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}

	const mouseMove = (event) => {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}

	const mouseLeave = () => {
		isHovered = false;
	}

</script>

<div
	on:mouseover={mouseOver}
	on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}
	on:focus={mouseOver}
	on:focusout={mouseLeave}
	class={`${$$props.class}`}>
	<slot/>
</div>

{#if canShow && isHovered}
	<div 
		style="top: {y}px; left: {x}px;"
		class="tooltip"
		class:capitalise={capitalise}
		in:fade="{{ delay: delayTime, duration: 0 }}">
		{text}
		{#each controls as control}
		<IconControl control={control}/>
		{/each}
	</div>

{/if}

<style>
	.capitalise {
		text-transform: capitalize;
	}
</style>