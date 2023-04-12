<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faGear } from '@fortawesome/free-solid-svg-icons'
    import { fade, slide } from "svelte/transition";
    import { isSettingsOpen } from "../../store";
    import BurgerButton from "../common/buttons/BurgerButton.svelte";
    import AccordionTool from "./AccordionTool.svelte";
    import Advanced from "./advanced/Advanced.svelte";
    import Load from "./load/Load.svelte";
    import Save from "./save/Save.svelte";
    import SelectTheme from "./selectTheme/SelectTheme.svelte";
    import ViewSettings from "./viewSettings/ViewSettings.svelte";
    import Help from "./help/Help.svelte";
</script>

<div class="menu-button">
    <BurgerButton onClick={() => $isSettingsOpen = !$isSettingsOpen}/>
</div>
{#if $isSettingsOpen}
    <div class="settings-menu" transition:slide>
        <h1>Settings <Fa icon={faGear}/></h1>
        <div>
            <AccordionTool text={"Help"}>
                <Help/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Theme"}>
                <SelectTheme/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"View"}>
                <ViewSettings/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Save"}>
                <Save/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Load"}>
                <Load/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Advanced"}>
                <Advanced/>
            </AccordionTool> 
        </div>
    </div>
{/if}

<style>
    .settings-menu {
        position: absolute;
        padding: 2rem;
        top: 0;
        left: 0;
        border: 2px solid var(--primary);
        border-radius: var(--border-radius);
        background-color: var(--dark-grey-90);
        z-index: 10;
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 18rem;
        margin: var(--margin);
    }

    .menu-button {
        position: absolute;
        z-index: 11;
        margin: var(--margin);
    }
</style>