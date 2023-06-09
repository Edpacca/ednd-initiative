<script lang="ts">
    import { SaveError, setLocalStorageEncounter } from "../../../lib/persistance";
    import ConfirmOverwrite from "./ConfirmOverwrite.svelte";
    import { entities, saveState } from "../../../store";
    import { CreatureType } from "../../../lib/models/creature";
    import { EffectType } from "../../../lib/models/effect";
    import CheckboxIcon from "../../common/buttons/CheckboxIcon.svelte";
    import Player from "../../../graphics/entity-types/player.svelte";
    import Enemy from "../../../graphics/entity-types/enemy.svelte";
    import Cave from "../../../graphics/icons/cave.svelte";
    import { ENEMY_CREATURE_TYPES } from "../../../lib/models/typeFilters";
    import { SaveState } from "../../../lib/models/saveState";

    let name: string;
    let messageName = "";
    $: hasName = name ? name.length > 0 : false;

    let checkedPlayers = true;
    let checkedEnemies = true;
    let checkedEffects = true;
    $: checkedAll = checkedPlayers && checkedEnemies && checkedEffects;

    const saveEncounter = (override = false) => {
        let filteredTypes = []
        if (checkedPlayers) filteredTypes.push(CreatureType.Player);
        if (checkedEffects) filteredTypes.push(EffectType.Effect);
        if (checkedEnemies) filteredTypes = filteredTypes.concat(ENEMY_CREATURE_TYPES);

        try {
            setLocalStorageEncounter(name, $entities, filteredTypes, override)
            messageName = name;
            name = "";
            $saveState = SaveState.Saved;
        } catch (e) {
            if (e instanceof SaveError) $saveState = SaveState.Overwrite;
        }
    }

    const cancel = () => $saveState = SaveState.None;
    
    const onEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            saveEncounter();
        }
    }
    
    $: if($saveState === SaveState.Saved) {
        setTimeout(() => { 
            $saveState = SaveState.None;
            messageName = "";
        }, 4000);
    }

    const setFilters = (checked: boolean) => {
        checkedPlayers = true;
        checkedEnemies = checked;
        checkedEffects = checked;
    }

    $: setFilters(checkedAll);

</script>

<h2>Save Group</h2>
<div class="setting-container">
    <div class="checkboxes">
        <div>
            <label for="save-all">Save All</label>
            <input type="checkbox" id="save-all" bind:checked={checkedAll}/>
        </div>
        <CheckboxIcon 
            bind:isChecked={checkedPlayers}
            isDisabled={!checkedEnemies && !checkedEffects}
            label="Players"
            checkedColor="var(--gold)">
            <Player/>
        </CheckboxIcon>
        <CheckboxIcon 
            bind:isChecked={checkedEnemies}
            isDisabled={!checkedPlayers && !checkedEffects}
            label="Enemies"
            checkedColor="var(--primary)">
            <Enemy/>
        </CheckboxIcon>
        <CheckboxIcon
            bind:isChecked={checkedEffects}
            isDisabled={!checkedEnemies && !checkedPlayers}
            label="Effects"
            checkedColor="var(--blue)">
            <Cave/>
        </CheckboxIcon>
    </div>
    <input type="text" placeholder="Group Name" bind:value={name} on:input={() => messageName = ""} on:keydown={e => onEnter(e)}>
    {#if $saveState === SaveState.Saved}
        <div>{messageName} saved to local storage!</div>
    {:else if $saveState === SaveState.None && hasName}
        <button on:click={() => saveEncounter()} class="submit-button">Save</button>
    {/if}
</div>
<ConfirmOverwrite overwrite={() => saveEncounter(true)} cancel={cancel} name={name} isOpen={$saveState === SaveState.Overwrite}/>

<style>
    .setting-container {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        color: var(--light-grey);
    }

    input[type="text"] {
        background-color: var(--grey);
        font-style: italic;
        color: var(--white);
    }

    input::placeholder {
        color: var(--light-grey);
    }

    input:focus {
        outline: none;
    }

    .checkboxes {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    label {
        text-align: center;
    }
</style>