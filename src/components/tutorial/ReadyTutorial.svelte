<script>
    import { onMount } from "svelte";
    import { CreatureType } from "../../lib/models/creature";
    import { isLocked } from "../../store";
    import LockPage from "../lockToggle/LockPage.svelte";
    import DemoCreatureTable from "./DemoCreatureTable.svelte";
    import DemoEffectTable from "./DemoEffectTable.svelte";
    import DemoInitiativeTable from "./DemoInitiativeTable.svelte";

    onMount(() => {
        $isLocked = false;
    })

</script>
<ul>
    <li>Ready to go? Click the swords!</li>
    {#if $isLocked}
        <li>Click the crossed swords to return to editing mode</li>
        <li>Use the arrow buttons or arrow keys to go to the next turn</li>
    {/if}
</ul>
<hr/>
<div class="flex-col">
    <LockPage/>
</div>
<div class="scroll-window">
    {#if $isLocked}
        <DemoInitiativeTable/>
    {:else}
        <DemoCreatureTable typeFilter={[CreatureType.Player]}/>
        <DemoCreatureTable typeFilter={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]} disableHeaders={true}/>
        <DemoEffectTable/>
    {/if}
</div>
