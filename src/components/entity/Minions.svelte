<script>
    import { isLocked } from "../../store";
    import NumberInput from "../common/NumberInput.svelte";

    export let quantity;
    export let name;
    export let hp;
</script>

{#if quantity}
    <div>
        {#each Array(quantity) as e, i}
            <div class="sub-entity">
                <div class="number">#{i + 1}</div>
                <input type="text" value={`${name} #${i + 1}`}/>
            </div>
        {/each}
    </div>
{/if}

<style>
    input {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
        border: 1px solid grey;
    }

    .sub-entity {
        display: grid;
        grid-template-columns: 2em 1fr 3em;
        column-gap: 0.5em;
        align-items: center;
        width: calc(100% + 3em + 10px)
    }

    .number {
        font-size: 1.5em;
        font-weight: bold;
        text-align: right;
    }
</style>