<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faGear, faSave, faQuestion, faPaintBrush, faMagnifyingGlass, faGears } from '@fortawesome/free-solid-svg-icons'
    import { slide } from "svelte/transition";
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
            <AccordionTool text={"Help"} icon={faQuestion}>
                <Help/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Theme"} icon={faPaintBrush}>
                <SelectTheme/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"View"} icon={faMagnifyingGlass}>
                <ViewSettings/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Save / Load"} icon={faSave}>
                <Save/>
                <hr class="sub-hr"/>
                <Load/>
            </AccordionTool>
        </div>
        <div>
            <AccordionTool text={"Advanced"} icon={faGears}>
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

    .sub-hr {
        margin: 1rem 20%;
        border-color: var(--dark-grey-90);
    }
</style>