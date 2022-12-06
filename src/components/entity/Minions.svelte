<script>
    import { isLocked } from "../../store";
    import NumberInput from "../common/NumberInput.svelte";

    export let quantity;
    export let name;
</script>

{#if quantity}
    {#each Array(quantity) as e, i}
        <div class="minion-container">
            <div class="minion-number">#{i + 1}</div>
            <input type="text" value={`${name} #${i + 1}`}/>
        </div>
    {/each}
{/if}

<style>
    .minion-container {
        position: relative;
    }

    input {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
        border: 1px solid grey;
    }

    .minion-number {
        position: absolute;
        top: 0.2em;
        left: -2em;
        font-size: 1.5em;
        font-weight: bold;
        text-align: right;
    }
</style>