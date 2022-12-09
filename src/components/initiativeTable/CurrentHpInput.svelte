<script>
    import NumberInput from "../common/NumberInput.svelte";
    import { EntityType } from "../entity/entity";
    export let entity;
    $: isMinion = entity.type === EntityType.Minion;
    $: isBloodied = entity.hpCurrent <= entity.hpMax / 2;
    $: isDead = entity.hpCurrent <= 0;
    $: extraClass = isBloodied ? "bloodied" : isDead ? "dead" : "";
</script>


<NumberInput bind:value={entity.hpCurrent[0]} extraClasses={extraClass} isHidden={isMinion}/>
{#if isMinion}
{#each Array(entity.quantity) as m, i}
    <NumberInput value={entity.hpCurrent[i]} extraClasses={"minion-input"}/>
{/each}
{/if}