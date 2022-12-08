<script>
    import NumberInput from "../common/NumberInput.svelte";
    import { EntityType } from "../entity/entity";
    export let entity;
    $: isMinion = entity.type === EntityType.Minion;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2;
    $: isDead = entity.hpCurrent <= 0;
    $: extraClass = isBloodied ? "bloodied" : isDead ? "dead" : "";
</script>

<NumberInput bind:value={entity.hpCurrent} extraClasses={extraClass} isHidden={isMinion}/>
{#if isMinion}
    {#each Array(entity.quantity) as m}
        <NumberInput value={entity.hpCurrent} extraClasses={"minion-input"}/>
    {/each}
{/if}