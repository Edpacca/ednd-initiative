<script>
    export let quantity;
    export let name;
</script>

{#if quantity}
    <div>
        {#each Array(quantity) as e, i}
        <div class="sub-entity">
            <div class="number">#{i}</div>
            <input type="text" value={`${name} #${i}`}/>
        </div>
        {/each}
    </div>
{/if}

<style>
    input {
        height: 2.5em;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
    }

    .sub-entity {
        display: grid;
        grid-template-columns: 2em 1fr;
        column-gap: 0.5em;
        align-items: center;
    }

    .number {
        font-size: 1.5em;
        font-weight: bold;
        text-align: right;
    }
</style>