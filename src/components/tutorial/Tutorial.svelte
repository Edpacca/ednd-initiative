<script lang="ts">
    import { fade, fly, slide } from "svelte/transition";
    import { elasticOut } from "svelte/easing";
    import { isLocked, isTutorialCompleted, isTutorialOpen } from "../../store";
    import Arrow from "../../graphics/icons/arrow.svelte";
    import AddPlayers from "./AddPlayersTutorial.svelte";
    import AddMonsters from "./AddEnemiesTutorial.svelte";
    import AddEffects from "./AddEffectsTutorial.svelte";
    import CombatTutorial from "./CombatTutorial.svelte";
    import RollAllTutorial from "./RollAllTutorial.svelte";
    import { onMount } from "svelte";
    import RemoveButton from "../common/buttons/RemoveButton.svelte";
    import { TutorialStage, getTutorialStageString } from "../../data/tutorialData";
    import LogsTutorial from "./LogsTutorial.svelte";
    import SaveLoadTutorial from "./SaveLoadTutorial.svelte";
    import TutorialEnd from "./demo/TutorialEnd.svelte";
    import Wizard from "./Wizard.svelte";
    import ConfirmContinueTutorial from "./ConfirmContinueTutorial.svelte";
    import { setLocalStorageTutorialCompleted } from "../../lib/persistance";
    import { closeTutorial } from "../../lib/tutorial";

    let stage: TutorialStage = 0;
    let ready = false;

    const numberOfStages = Object.keys(TutorialStage).length / 2;

    const nextStage = () => {
        stage = (stage + 1) % numberOfStages;
    }

    const previousStage = () => {
        stage = stage === 0 ? 0 : stage - 1;
    }
    
    onMount(() => {
        ready = true;
    });
</script>

<div class="tutorial-container" transition:slide >
    <div class="tutorial-canvas" class:small-canvas={stage === TutorialStage.None}>
        <div class="top-left">
            <RemoveButton onClick={closeTutorial}/>
        </div>
        {#if stage === TutorialStage.None}
        <h1 class="gold">Welcome Traveller!</h1>
        {#if ready}
            <div class="wizard-popup" in:fly="{{ y: 50, delay: 500, duration: 1000, easing: elasticOut }}">
                <Wizard/>
            </div>
        {/if}
        <p class="text-block gold">
            I'm Edpacca - and this is my Initiative Tracker! <br> A DM's tool for tracking combat in DnD, designed for simplicity with a bit of flair.
        </p>
        <p class="gold">Looks like you're new here so let me take a second to show you around...</p>
        <div class="option-buttons">
            <button class="option-button" on:click={closeTutorial}>Silence fool! (close)</button>
            <button class="option-button" on:click={nextStage}>Sure, I could use a hand...</button>
        </div>
        <p>Replay this tutorial any time from the settings menu under "Help"</p>
        {:else}
            <div class="stage-buttons" in:slide>
                <button class="arrow-button" class:transparent={stage === 1} on:click={previousStage}>
                    <Arrow class="left"/>
                </button>
                <div class="tutorial-stage left-align">{getTutorialStageString(stage - 1)}</div>
                {#if stage !== TutorialStage.End}
                <div class="tutorial-stage right-align">{getTutorialStageString(stage + 1)}</div>
                <button class="arrow-button" on:click={nextStage}>
                    <Arrow/>
                </button>
                {/if}
            </div>
            
            <h1 class="gold underline">{getTutorialStageString(stage)}</h1>
            <div>
                {#if stage === TutorialStage.AddingPlayers}
                    <AddPlayers/>
                {:else if stage === TutorialStage.AddingEnemies}
                    <AddMonsters/>
                {:else if stage === TutorialStage.AddingEffects}
                    <AddEffects/>
                {:else if stage === TutorialStage.RollAll}
                    <RollAllTutorial/>
                {:else if stage === TutorialStage.Ready || stage === TutorialStage.Combat}
                    <CombatTutorial stage={stage}/>
                {:else if  stage === TutorialStage.ConfirmContinue}
                    <ConfirmContinueTutorial nextStage={nextStage}/>
                {:else if stage === TutorialStage.Logs}
                    <LogsTutorial/>
                {:else if stage === TutorialStage.Saving}
                    <SaveLoadTutorial/>
                {:else if stage === TutorialStage.End}

                <TutorialEnd/>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .wizard-popup {
        position: absolute;
        margin-right: 28rem;
    }

 

    h1 {
        margin-bottom: var(--margin)
    }

    p {
        margin-top: 0;
    }

    @keyframes rotate {
        0% {
            rotate: -15deg
        }
        80% {
            rotate: 5deg
        }
        100% {
            rotate: 0deg
        }
    }

    .text-block {
        z-index: 1;
        text-align: center;
    }

    .top-left {
        position: absolute;
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
        padding-bottom: 8rem;
        z-index: var(--z-tutorial);
        background-color: var(--black-50);
    }

    .tutorial-canvas {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: var(--black);
        border: 2px solid var(--gold);
        border-radius: var(--border-radius);
        padding: var(--padding);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.2rem;
        overflow-y: scroll;
        max-width: 60rem;
    }

    .small-canvas {
        height: initial;
    }

    .stage-buttons {
        display: grid;
        grid-template-columns: auto 1fr 1fr auto;
        justify-content: center;
        width: 50%;
        margin: var(--margin);
        align-items: center;
    }

    .tutorial-stage {
        color: var(--gold);
        font-weight: bold;
    }

    .left-align {
        text-align: left;
    }

    .right-align {
        text-align: right;
    }

    .arrow-button {
        fill: var(--gold);
        background-color: transparent;
        border: none;
        width: 8rem;
        transition: var(--transition-time);
    }

    .transparent {
        fill: transparent;
    }

    .arrow-button:hover {
        fill: var(--white);
    }
</style>