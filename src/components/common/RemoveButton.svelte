<script lang="ts">
    export let onClick: () => void;
    export let isDisabled: boolean = false;
</script>

<button class="remove" disabled={isDisabled} on:click={onClick}>x</button>

<style>
    .remove {
        font-weight: bold;
        background-color: brown;
        color: burlywood;
        border: none;
        border-radius: 0.1em;
        width: 1.5em;
        height: 1.5em;
        transition: 0.3s ease-out;
    }

    .remove:hover {
        background-color: red;
    }
</style>