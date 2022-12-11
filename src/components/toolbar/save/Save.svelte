<script lang="ts">
    import { SaveError, setLocalStorageParty } from "../../../lib/persistance";
    import { entities } from "../../../store";
    import { ALL, ALL_ENEMIES } from "../../common/EntityFilters";
    import { EntityType } from "../../entity/entity";
    import ConfirmOverwrite from "./ConfirmOverwrite.svelte";

    enum State {
        None,
        Saved,
        Overwrite
    }

    let name: string;
    let filteredTypes: EntityType[]
    let state = State.None;
    let messageName = "";
    $: hasName = name ? name.length > 0 : false;

    const saveParty = (override = false) => {
        try {
            setLocalStorageParty(name, $entities, filteredTypes, override);
            messageName = name;
            name = "";
            state = State.Saved;
        } catch (e) {
            if (e instanceof SaveError) state = State.Overwrite;
        }
    }

    const cancel = () => state = State.None;
    
    const onEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            saveParty();
        }
    }
    
    $: if(state === State.Saved) {
        setTimeout(() => { 
            state = State.None;
            messageName = "";
        }, 4000);
    }

    $: console.log(state);

</script>

<div class="setting-container">
    <label for="save-filter">Filter</label>
    <select bind:value={filteredTypes} id="save-filter">
        <option value={ALL}>All entities</option>
        <option value={ALL_ENEMIES}>All enemies</option>
        <option value={[EntityType.Player]}>Players</option>
        <option value={[EntityType.Enemy]}>Enemies</option>
        <option value={[EntityType.Minion]}>Minions</option>
    </select>
    <input placeholder="Name" bind:value={name} on:input={() => messageName = ""} on:keydown={e => onEnter(e)}>
    {#if state === State.Saved}
        <div>{messageName} saved to local storage!</div>
    {:else if state === State.None && hasName}
        <button on:click={() => saveParty()} class="submit-button">Save</button>
    {/if}
</div>
<ConfirmOverwrite overwrite={() => saveParty(true)} cancel={cancel} name={name} isOpen={state === State.Overwrite}/>

<style>
    .setting-container {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        color: var(--light-grey);
    }

    input {
        background-color: var(--grey);
        font-style: italic;
        color: var(--white);
    }

    input::placeholder {
        color: var(--light-grey);
    }
</style>