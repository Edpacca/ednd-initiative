<script>
    import Skull from "../../../graphics/icons/skull.svelte";
    import NumberInput from "../../common/NumberInput.svelte";

    export let hp;
    export let hpMax;
    export let index;

    $: dead = hp <= 0;
    $: bloodied = hp < (hpMax / 2) && !dead;
    $: extraClasses = bloodied ? "minion-input bloodied" : dead ? "dead" : "minion-hp-input";
</script>

<div class="relative">
    <NumberInput bind:value={hp} extraClasses={extraClasses}/>
    <div class="spacer"></div>
    {#if hp <= 0}
        <div class="skull" style={`--i: ${index + 1}`}><Skull/></div>
    {/if}
</div>

<style>
    .spacer {
        height: var(--healthbar-height);
    }
</style>