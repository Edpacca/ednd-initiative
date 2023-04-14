<script lang="ts">
    import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte'
    export let onClick: () => void;
    export let icon: IconDefinition;
    export let spin = false;
    let isHovered = false;

    $: isSpinning = spin && isHovered
</script>

<button on:click={onClick} on:mouseenter={() => isHovered = true} on:mouseleave={() => isHovered = false}>
    <Fa icon={icon} size="1.3rem" spin={isSpinning}/>
</button>

<style>
    button {
        background: var(--dark-grey);
        width: 2rem;
        height: 2rem;
        border: 1px solid var(--light-grey);
        border-radius: var(--border-radius);
        outline: none;
        transition: var(--transition-time);
        color: var(--light-grey);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background: var(--grey);
        border-color: var(--white);
        transition: var(--transition-time);
        color: var(--white);
    }
</style>