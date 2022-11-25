<script>
    export let quantity;
    export let name;
</script>

{#if quantity}
    <div>
        {#each Array(quantity) as e, i}
            <input class="sub-entity" type="text" value={`${name} #${i}`}/>
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
        width: 80%;
        margin-left: 10%;
    }
</style>