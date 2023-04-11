<script lang="ts">
    import { CONDITIONS } from "../../../lib/conditions";
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import ConditionIcon from "../../common/icons/ConditionIcon.svelte";
    import InputDropdownFilter from "../../common/dropdown/InputDropdownFilter.svelte";
    import type { FocusType } from "./focusType";
    
    export let conditions: string[];
    export let conditionInput: HTMLInputElement;
    export let focused: FocusType = "none";
    export let submitCondition: (condition: string) => void;
    export let removeCondition: (condition: string) => void;
    export let value = "";
    
    const submit = (condition: string) => {
        submitCondition(condition);
        value = "";
    }

    const clearConditions = () => {
        conditions.forEach(condition => removeCondition(condition));
    }

    $: listFocusCondition = focused === "condition";
</script>
<div class="effects-conditions">
    <div class="header-line">
        <div class="header-small underline">Effects & Conditions</div>
        <RemoveButton onClick={clearConditions}/>
    </div>
    <slot>
    </slot>
    <div class="search-header">
        <InputDropdownFilter
            bind:input={conditionInput}
            bind:value={value}
            divClass="conditions-controls"
            inputClass="conditions-input"
            onFocusIn={() => focused = "condition"}
            listFocusCondition={listFocusCondition}
            submit={submit}
            list={CONDITIONS}
            exclude={conditions}
            >
            <PlusMinusButton type="+" onClick={() => submit(value)} width="2rem"/>
        </InputDropdownFilter>
    </div>
    {#if conditions && conditions.length > 0}
    <div class="condition-grid">
        {#each conditions as condition}
            <div><ConditionIcon condition={condition} class="condition-icon" width="3rem" hasTooltip={false}/></div>
            <div>{condition}</div>
            <PlusMinusButton type="-" onClick={() => removeCondition(condition)} width="2rem"/>
        {/each}
    </div>
    {:else}
        <div>No conditions</div>
    {/if}
</div>

<style>
    .effects-conditions {
        border-radius: var(--border-radius);
        text-align: center;
        padding: 1rem;
    }


    .condition-grid {
        display: grid;
        grid-template-columns: 3rem 1fr 2rem;
        padding-right: 0.5rem;
        text-align: left;
        column-gap: 2rem;
        align-items: center;
        font-size: var(--fontsize-L);
        text-transform: capitalize;
        max-height: 30vh;
        overflow-y: scroll;
    }

    .search-header {
        position: relative;
    }

    .header-line {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 1.5rem;
    }
</style> 