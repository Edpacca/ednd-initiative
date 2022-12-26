<script>
    export let max;
    export let current;
    $: percentage = Math.max(Math.round(100 * current / max), 0);
    $: color = percentage <= 50 ? "red" : percentage < 100 ? "orange" : "green";
    $: cssVars = `--width: ${Math.min(percentage, 100)}%; --color: ${color}`
</script>

<div class="health-bar" style={cssVars}></div>
{#if percentage > 100}
    <div class="health-bar" style={`--width: ${Math.min(percentage - 100, 100)}%; --color: lightGreen`}></div>
{/if}

<style>
    .health-bar {
        width: var(--width);
        background-color: var(--color);
        height: var(--healthbar-height);
        transition: 0.8s ease-out;
        border-radius: 0.125rem;
    }
</style>