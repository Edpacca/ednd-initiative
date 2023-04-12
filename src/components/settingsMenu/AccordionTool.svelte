<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import { slide } from "svelte/transition";
    export let text;
    export let icon = undefined;
    let isOpen = false;
</script>


<button on:click={() => isOpen = !isOpen} class="setting-toggle-button relative">
    {text}
    {#if icon}
        <Fa icon={icon} style="position: absolute; right: 0.5rem"/>
    {/if}
</button>
{#if isOpen}
    <div class="accordion" transition:slide>
        <slot></slot>
    </div>
{/if}

<style>
    .accordion {
        margin: 1rem 0;
    }
</style>