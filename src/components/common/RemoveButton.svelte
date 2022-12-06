<script lang="ts">
    export let onClick: () => void;
    export let isHidden: boolean = false;
</script>

<button class="remove" class:hidden={isHidden} on:click={onClick}>x</button>

<style>
    .remove {
        font-weight: bold;
        background-color: var(--primary);
        color: var(--secondary);
        border: none;
        border-radius: 0.1em;
        width: 1.5em;
        height: 1.5em;
        transition: 0.3s ease-out;
    }

    .remove:hover {
        background-color: var(--red);
    }
</style>