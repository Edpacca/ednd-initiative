<script lang="ts">
    import { slide } from "svelte/transition";
    import { openedOnce, showTutorial } from "../../store";
    import Arrow from "../../graphics/icons/arrow.svelte";
    import AddPlayers from "./AddPlayers.svelte";
    import AddMonsters from "./AddMonsters.svelte";
    import AddEffects from "./AddEffects.svelte";
    import ReadyTutorial from "./ReadyTutorial.svelte";
    import RollAllTutorial from "./RollAllTutorial.svelte";
    import { onMount } from "svelte";
    import RemoveButton from "../common/buttons/RemoveButton.svelte";
    import { TutorialStage } from "../../data/tutorialData";

    let stage: TutorialStage = 0;

    const numberOfStages = Object.keys(TutorialStage).length / 2;

    const nextStage = () => {
        stage = (stage + 1) % numberOfStages;
    }

    const previousStage = () => {
        stage = stage === 0 ? numberOfStages - 1 : stage - 1;
    }

    onMount(() => {
        $openedOnce = true;
    })
</script>

<div class="tutorial-container"  transition:slide>
    <div class="tutorial-canvas">
        <div class="top-left">
            <RemoveButton onClick={() => $showTutorial = false}/>
        </div>
        <h1>Welcome Traveller</h1>
        <p>
            This is a DM tool for tracking combat in DnD, designed for simplicity with a bit of flair.
        </p>
        {#if stage === TutorialStage.None}
        <p>Looks like you're new here so let me take a second to show you around...</p>
        <div class="option-buttons">
            <button class="option-button" on:click={() => $showTutorial = false}>Silence fool! (close)</button>
            <button class="option-button" on:click={nextStage}>Sure, I could use a hand</button>
        </div>
        {:else}
            <div class="stage-buttons">
                <button class="arrow-button" on:click={previousStage}>
                    <Arrow class="left"/>
                </button>
                <div></div>
                <button class="arrow-button" on:click={nextStage}>
                    <Arrow/>
                </button>
            </div>
            <div class="full-width">
                {#if stage === TutorialStage.AddingPlayers}
                    <AddPlayers/>
                {:else if stage === TutorialStage.AddingMonsters}
                    <AddMonsters/>
                {:else if stage === TutorialStage.AddingEffects}
                    <AddEffects/>
                {:else if stage === TutorialStage.RollAll}
                    <RollAllTutorial/>
                {:else if stage === TutorialStage.Ready || stage === TutorialStage.Combat}
                    <ReadyTutorial stage={stage}/>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .top-left {
        position: fixed;
        left: 0;
        top: 0;
        padding: var(--padding);
    }
    .tutorial-container {
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: var(--margin);
        padding-bottom: 10rem;
        z-index: var(--z-tutorial);
    }

    .tutorial-canvas {
        background-color: var(--black);
        border: 2px solid green;
        border-radius: var(--border-radius);
        padding: var(--padding);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.2rem;
    }

    .option-button {
        background: var(--secondary);
        height: 3rem;
        padding: 1rem;
        color: var(--black);
        border: 1px solid var(--grey);
        border-radius: var(--border-radius);
        font-weight: bold;
        transition: var(--transition-time);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .option-button:hover {
        border-color: var(--light-grey);
        background-color: var(--dark-grey);
        color: var(--white);
    }

    .option-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
    }

    .stage-buttons {
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-content: center;
        width: 50%;
        margin: var(--padding);
    }

    .arrow-button {
        fill: var(--gold);
        background-color: transparent;
        border: none;
        width: 8rem;
        transition: var(--transition-time);
    }

    .arrow-button:hover {
        fill: var(--white);
    }

    .full-width {
        min-width: 60vw;
    }
</style>