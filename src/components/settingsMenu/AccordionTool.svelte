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
    
    button {
        background: none;
        border: none;
        border-top: 2px solid var(--light-grey);
        color: var(--white);
        font-size: 1rem;
        height: 2rem;
        width: calc(100% - var(--border-radius));
        transition: 200ms;
    }

    button:hover {
        border-radius: var(--border-radius);
        border-top: 2px solid var(--secondary);
        background-color: var(--secondary);
        color: var(--dark-grey);
        width: 100%;
    }
</style>