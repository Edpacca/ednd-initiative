<script lang="ts">
    import { SaveError, setLocalStorageParty } from "../../../lib/persistance";
    import { entities } from "../../../store";
    import { ALL, ALL_ENEMIES } from "../../common/EntityFilters";
    import { EntityType } from "../../entity/entity";
    let name: string;
    let filteredTypes: EntityType[]
    let message = "";
    let isOverriding = false;
    $: hasName = name ? name.length > 0 : false;

    const saveParty = (override = false) => {
        try {
            setLocalStorageParty(name, $entities, filteredTypes, override);
            message = `${name} saved to local storage!`
            name = "";
            isOverriding = false;
            clearMessage();
        } catch (e) {
            if (e instanceof SaveError) message = e.message;
            isOverriding = true;
        }
    }

    const clearMessage = async() => {
        setTimeout(() => message = "", 4000);
    }
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
    <input placeholder="Name" bind:value={name} on:input={() => message = ""}>
    {#if message}
        <div>{message}</div>
    {/if}
    {#if hasName && !message && !isOverriding}
        <button on:click={() => saveParty()} class="submit-button">Save</button>
    {:else if isOverriding}
        <button on:click={() => saveParty(true)} class="submit-button">Save</button>
        <button on:click={() => name = ""} class="submit-button">Cancel</button>
    {/if}
</div>

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