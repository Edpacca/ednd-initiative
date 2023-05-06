<script lang="ts">
    import { faGear, faSave, faQuestion, faPaintBrush, faMagnifyingGlass, faGears, faCross, faXmark } from '@fortawesome/free-solid-svg-icons'
    import { slide } from "svelte/transition";
    import { isSettingsOpen, saveState } from "../../store";
    import AccordionTool from "./AccordionTool.svelte";
    import Advanced from "./advanced/Advanced.svelte";
    import Load from "./load/Load.svelte";
    import Save from "./save/Save.svelte";
    import SelectTheme from "./selectTheme/SelectTheme.svelte";
    import ViewSettings from "./viewSettings/ViewSettings.svelte";
    import Help from "./help/Help.svelte";
    import IconButton from '../common/buttons/IconButton.svelte';
    import SaveLoad from './save/SaveLoad.svelte';

    let isExperimentalEnabled = false;
    let justSaved = false;
</script>

<div class="menu-button">
    <IconButton icon={$isSettingsOpen ? faXmark : faGear} onClick={() => $isSettingsOpen = !$isSettingsOpen} spin={!$isSettingsOpen}/>
</div>
{#if $isSettingsOpen}
    <div class="settings-menu" transition:slide>
        <h2>Settings</h2>
        <div>
            <AccordionTool text={"Help settings"} icon={faQuestion}>
                <Help/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Theme"} icon={faPaintBrush}>
                <SelectTheme/>
            </AccordionTool>
        </div>
        {#if isExperimentalEnabled}
            <div>
                <AccordionTool text={"View"} icon={faMagnifyingGlass}>
                    <ViewSettings/>
                </AccordionTool>
            </div>
        {/if}
        <div>
            <AccordionTool text={"Save / Load"} icon={faSave}>
                <SaveLoad/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Advanced"} icon={faGears}>
                <Advanced bind:isExperimentalEnabled={isExperimentalEnabled}/>
            </AccordionTool> 
        </div>
    </div>
{/if}

<style>
    .settings-menu {
        position: fixed;
        padding: var(--padding);
        top: 0;
        left: 0;
        border: 2px solid var(--primary);
        border-radius: var(--border-radius);
        background-color: var(--dark-grey-90);
        z-index: 10;
        display: flex;
        flex-direction: column;
        text-align: center;
        min-width: var(--settings-menu-width);
        margin: var(--margin);
    }

    @media only screen and (max-width: 986px) {
        .settings-menu {
            width: 40rem;
            left: 0;
            right: 0;
            margin: auto;
            margin-top: var(--margin);
            background-color: var(--dark-grey);
        }
    }   

    .menu-button {
        position: fixed;
        padding: var(--padding);
        top: 0;
        left: 0;
        z-index: 11;
    }


</style>