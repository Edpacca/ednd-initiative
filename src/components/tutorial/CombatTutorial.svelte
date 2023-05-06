<script lang="ts">
    import { onMount } from "svelte";
    import { activeEntityTurnIndex, isLocked } from "../../store";
    import { addNewLog, clearLogs } from "../../lib/logger";
    import LockPage from "../lockToggle/LockPage.svelte";
    import DemoCreatureTable from "./demo/DemoCreatureTable.svelte";
    import DemoEffectTable from "./demo/DemoEffectTable.svelte";
    import DemoInitiativeTable from "./demo/DemoInitiativeTable.svelte";
    import { TutorialStage } from "../../data/tutorialData";
    import DemoTurnTracker from "./demo/DemoTurnTracker.svelte";
    import Minion from "../../graphics/entity-types/minion.svelte";

    onMount(() => {
        $isLocked = false;
        clearLogs();
        $activeEntityTurnIndex = 0;
        addNewLog();
    });

    export let stage: TutorialStage

</script>
<ul>
    {#if !$isLocked}
        <li>Ready to go? Click the swords to start the combat!</li>
        <li>Notice how the table changes when in combat mode</li>
    {:else}
        {#if stage !== TutorialStage.Combat}
                <li>Now, we see <strong>CURRENT HP</strong> instead of MAX HP</li>
                <li>Click the crossed swords to return to editing mode</li>
                <li>Use the arrow buttons or arrow keys to go to the next turn</li>
                <li><em>Note</em> there may be issues if you didn't roll initiative for everything!</li>
        {:else}
            <li>To record damage or conditions left click on a creature's icon</li>
            <li>For a minion,  <span class="inline"><Minion class="primary line-height"/></span> left click it's number instead!</li>
            <li>Right click an icon to add conditions quickly</li>
            <li>You can modify health directly from the current HP box</li>
            <li>Right click the AC to add a modifier (e.g. for the <em>Shield</em> spell)</li>
            <li>Click on the legendary actions counter to use a legendary action</li>
        {/if}
    {/if}
</ul>
<hr/>
<div class="lock-page-demo">
    <LockPage/>
</div>
<div class="scroll-window extra-pad">
    {#if $isLocked}
        <DemoTurnTracker/>
        <DemoInitiativeTable/>
    {:else}
        <DemoCreatureTable/>
        <DemoEffectTable/>
    {/if}
</div>

<style>
    .lock-page-demo {
        margin: var(--padding);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .extra-pad {
        padding-left: 7rem;
    }
</style>