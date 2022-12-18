<script lang="ts">
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    export let conditions: string[];
    let value = "";

    const submitCondition = () => {
        conditions = [...conditions, value]
        value = "";
    }
    
</script>
<div class="effects">
    <div class="header-small underline">Effects & Conditions</div>
    <input bind:value/><button><PlusMinusButton type="+" onClick={submitCondition}/></button>
    {#if conditions && conditions.length > 0}
        {#each conditions as condition}
            <div>{condition}</div>
        {/each}
    {:else}
        <div>No effects</div>
    {/if}
</div>

<style>
    .effects {
        border: 2px solid var(--primary);
        border-radius: var(--border-radius);
        text-align: center;
        padding: 1rem;
    }
</style>