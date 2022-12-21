<script>
    export let condition;
    export let width = "100%";
</script>

<svg class={$$props.class} width={width} height={width}>
    <use href={`conditions/conditions.svg#${condition}`} />
</svg>
