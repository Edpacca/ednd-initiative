<script lang="ts">
    import { onMount } from "svelte";
    import { CreatureType } from "../../lib/models/creature";
    import { activeEntityTurnIndex, isLocked } from "../../store";
    import LockPage from "../lockToggle/LockPage.svelte";
    import DemoCreatureTable from "./DemoCreatureTable.svelte";
    import DemoEffectTable from "./DemoEffectTable.svelte";
    import DemoInitiativeTable from "./DemoInitiativeTable.svelte";
    import TurnTracker from "../turnTracker/TurnTracker.svelte";
    import { addNewLog, clearLogs } from "../../lib/logger";
    import { TutorialStage } from "../../data/tutorialData";
    import Heart from "../../graphics/icons/heart.svelte";

    onMount(() => {
        $isLocked = true;
        clearLogs();
        $activeEntityTurnIndex = 0;
        addNewLog();
    });

    export let stage: TutorialStage

</script>
<ul>
    {#if stage !== TutorialStage.Combat}
    {#if $isLocked}
        <li>Now, we see <strong>CURRENT HP</strong> instead of MAX HP</li>
        <li>Click the crossed swords to return to editing mode</li>
        <li>Use the arrow buttons or arrow keys to go to the next turn</li>
        <li><em>Note</em> there may be issues if you didn't roll initiative for everything</li>
        <li>Click next to learn about damage and conditions</li>
    {:else}
        <li>Ready to go? Click the swords to start the combat!</li>
        <li>Notice how the table changes when in combat mode</li>
    {/if}
    {:else}
        <li>To record damage or conditions left click on a creature's icon</li>
        <li>Right click an icon to add conditions quickly</li>
        <li>You can modify health directly from the current HP box</li>
        <li>Right click the AC to add a modifier (e.g. for the <em>Shield</em> spell)</li>
        <li>Click on the legendary actions counter to use a legendary action</li>
        <li>Right click on the legendary actions counter if you make a mistake</li>
    {/if}
</ul>
<hr/>
<div class="lock-page-demo">
    <LockPage/>
</div>
<div class="scroll-window extra-pad">
    {#if $isLocked}
        <TurnTracker/>
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