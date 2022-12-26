<script lang="ts">
    export let onClick: () => void;
</script>

<button on:click={onClick}>
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="10" x2="40" y2="10"/>
        <line x1="0" y1="20" x2="40" y2="20"/>
        <line x1="0" y1="30" x2="40" y2="30"/>
    </svg>
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
    }

    button svg {
        stroke: var(--light-grey);
        stroke-width: 4px;
        width: 100%;
        height: 100%;
    }

    button:hover {
        background: var(--grey);
        border-color: var(--white);
        transition: var(--transition-time);
    }

    button:hover svg {
        stroke: var(--white);
        transition: var(--transition-time);
    }
</style>