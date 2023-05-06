<script>
    import { fly } from "svelte/transition";


    import Wizard from "./Wizard.svelte";
    import { elasticOut } from "svelte/easing";
    import { isTutorialCompleted, isTutorialOpen } from "../../store";
    import { setLocalStorageTutorialCompleted } from "../../lib/persistance";

    export let nextStage;

    const closeTutorial = () => {
        $isTutorialOpen = false;
        $isTutorialCompleted = true;
        setLocalStorageTutorialCompleted($isTutorialCompleted);
    }

</script>
<div class="upside-down-swing">
    <div class="flex-col" in:fly="{{ y: 50, delay: 500, duration: 2000, easing: elasticOut }}">
        <Wizard height="8rem"/>
    </div>
</div>

<p class="gold">Oh, eager to learn more? An avid student of the arcane!</p>
<div class="option-buttons">
    <button class="option-button" on:click={closeTutorial}>No, I get it already!</button>
    <button class="option-button" on:click={nextStage}>Gain more XP</button>
</div>

<style>
    .upside-down-swing {
        rotate: 180deg;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        margin-top: 8rem;
    }
</style>