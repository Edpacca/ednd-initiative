<script lang="ts">
    import { SaveError, setLocalStorageEncounter } from "../../../lib/persistance";
    import ConfirmOverwrite from "./ConfirmOverwrite.svelte";
    import { entities } from "../../../store";
    import type { EntityType } from "../../../lib/models/entity";
    import { CreatureType } from "../../../lib/models/creature";
    import { EffectType } from "../../../lib/models/effect";

    enum State {
        None,
        Saved,
        Overwrite
    }

    const ALL: EntityType[] = [
        CreatureType.Player,
        CreatureType.Enemy,
        CreatureType.Minion,
        CreatureType.Boss,
        EffectType.Effect
    ]

    let name: string;
    let filteredTypes: EntityType[]
    let state = State.None;
    let messageName = "";
    $: hasName = name ? name.length > 0 : false;

    const saveParty = (override = false) => {
        try {
            setLocalStorageEncounter(name, $entities, filteredTypes, override)
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
    <input type="checkbox" id="save-filter" value={ALL}/>
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