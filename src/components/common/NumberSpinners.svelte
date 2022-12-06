<script lang="ts">
    export let value: number;
</script>

<div class="spinners">
    <button on:click={() => value++}>+</button>
    <button on:click={() => value--}>-</button>
</div>

<style>
    .spinners {
        position: absolute;
        right: 0;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        height: 100%;
    }

    button {
        display: none;
    }

    .spinners button:first-child {
        border-radius: 0 0.2rem 0 0;
    }

    .spinners  button:last-child {
        border-radius: 0 0 0.2rem 0;
    }
</style>