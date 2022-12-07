<script lang="ts">
    import Cross from "../../assets/symbols/cross.svelte";

    export let onClick: () => void;
    export let isHidden: boolean = false;
</script>

<button class="remove flex-col" class:hidden={isHidden} on:click={onClick}><Cross/></button>

<style>
    .remove {
        font-weight: bold;
        background-color: var(--dark-grey);
        color: var(--secondary);
        border: none;
        border-radius: 4px;
        width: 1.5em;
        height: 1.5em;
        transition: 0.3s ease-out;
        stroke: var(--secondary);
    }

    .remove:hover {
        background-color: var(--red);
    }
</style>