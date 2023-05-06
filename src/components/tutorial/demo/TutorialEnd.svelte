<script>
    import { elasticOut } from "svelte/easing";
    import { showTutorial } from "../../../store";
    import Wizard from "../Wizard.svelte";
    import { fly } from "svelte/transition";
</script>

<div class="flex-col" in:fly="{{ y: 50, delay: 500, duration: 1000, easing: elasticOut }}">
    <Wizard height="8rem"/>
</div>
<p class="gold text-center">Hmm? Oh! You're still here.</p>
<p class="gold text-center">No one has actually ever made it this far before...</p>
<div class="option-buttons">
    <button class="option-button" on:click={() => $showTutorial = false}>Leave quietly...</button>
    <button class="option-button" on:click={() =>  $showTutorial = false}>Huzzah!</button>
</div>