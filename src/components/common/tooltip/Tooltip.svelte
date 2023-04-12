<script>
	export let title = "";
	let isHovered = false;
	let x;
	let y;

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

<div on:mouseover={mouseOver} on:mouseleave={mouseLeave} on:mousemove={mouseMove} on:focus={mouseOver} on:focusout={mouseLeave} class={`${$$props.class}`}>
	<slot/>
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
{/if}
