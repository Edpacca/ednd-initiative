<script lang="ts">
    import BurgerButton from "../common/BurgerButton.svelte";
    import AccordionTool from "./AccordionTool.svelte";
    import Advanced from "./advanced/Advanced.svelte";
    import Load from "./load/Load.svelte";
    import Save from "./save/Save.svelte";
    import SelectTheme from "./selectTheme/SelectTheme.svelte";
    let isOpen = false;
</script>

<div class="menu-button">
    <BurgerButton onClick={() => isOpen = !isOpen}/>
</div>
{#if isOpen}
    <div class="toolbar">
        <h1>Settings</h1>
        <div>
            <AccordionTool text={"Theme"}>
                <SelectTheme/>
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
    .toolbar {
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
        width: 14rem;
        margin: var(--margin);
    }

    .menu-button {
        position: absolute;
        z-index: 11;
        margin: var(--margin);
    }
</style>