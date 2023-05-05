<script lang="ts">
    import { fade, fly, slide } from "svelte/transition";
    import { elasticOut } from "svelte/easing";
    import { isLocked, openedOnce, showTutorial } from "../../store";
    import Arrow from "../../graphics/icons/arrow.svelte";
    import AddPlayers from "./AddPlayers.svelte";
    import AddMonsters from "./AddMonsters.svelte";
    import AddEffects from "./AddEffects.svelte";
    import CombatTutorial from "./CombatTutorial.svelte";
    import RollAllTutorial from "./RollAllTutorial.svelte";
    import { onMount } from "svelte";
    import RemoveButton from "../common/buttons/RemoveButton.svelte";
    import { TutorialStage, getTutorialStageString } from "../../data/tutorialData";

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
        $openedOnce = true;
        ready = true;
    });

    const hideNext = (_stage: TutorialStage, locked: boolean) => {
        if (stage === TutorialStage.Ready) {
            showRightArrow = locked;
        } else {
            showRightArrow = true;
        }
    }

    let showRightArrow = true;

    $: hideNext(stage, $isLocked);
</script>

<div class="tutorial-container" transition:slide >
    <div class="tutorial-canvas" class:small-canvas={stage === TutorialStage.None}>
        <div class="top-left">
            <RemoveButton onClick={() => $showTutorial = false}/>
        </div>
        {#if stage === TutorialStage.None}
        <h1 class="gold">Welcome Traveller!</h1>
        {#if ready}
            <div class="wizard-popup" in:fly="{{ y: 50, delay: 500, duration: 1000, easing: elasticOut }}">
                <img src="/public/images/edpacca_wizard.png" alt="wizard-friend" class="wizard"/>
            </div>
        {/if}
        <p class="text-block">
            I'm Edpacca - and this is my Initiative Tracker! <br> A DM's tool for tracking combat in DnD, designed for simplicity with a bit of flair.
        </p>
        <p>Looks like you're new here so let me take a second to show you around...</p>
        <div class="option-buttons">
            <button class="option-button" on:click={() => $showTutorial = false}>Silence fool! (close)</button>
            <button class="option-button" on:click={nextStage}>Sure, I could use a hand...</button>
        </div>
        {:else}
            <div class="stage-buttons" in:slide>
                <button class="arrow-button" class:transparent={stage === 1} on:click={previousStage}>
                    <Arrow class="left"/>
                </button>
                <div class="tutorial-stage left-align">{getTutorialStageString(stage - 1)}</div>
                {#if showRightArrow}
                <div class="tutorial-stage right-align">{getTutorialStageString(stage + 1)}</div>
                <button class="arrow-button" on:click={nextStage}>
                    <Arrow/>
                </button>
                {/if}
            </div>
            <h1 class="gold underline">{getTutorialStageString(stage)}</h1>
            <div class="full-width">
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

    .wizard {
        height: 6rem;
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
        animation: rotate 1000ms ease-out;
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
        background-color: var(--black-50);
    }

    .tutorial-canvas {
        position: relative;
        background-color: var(--black);
        border: 2px solid var(--gold);
        border-radius: var(--border-radius);
        padding: var(--padding);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.2rem;
    }

    .small-canvas {
        height: initial;
    }

    .option-button {
        background: var(--grey);
        height: 3rem;
        padding: 1rem;
        color: var(--secondary);
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
        margin: var(--margin);
    }

    .stage-buttons {
        display: grid;
        grid-template-columns: auto 1fr 1fr auto;
        justify-content: center;
        width: 50%;
        margin: var(--padding);
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

    .full-width {
        min-width: 60vw;
    }
</style>