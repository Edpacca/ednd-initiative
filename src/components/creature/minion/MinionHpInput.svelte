<script lang="ts">
    import Skull from "../../../graphics/icons/skull.svelte";
    import NumberInput from "../../common/values/NumberInput.svelte";

    export let hp: number;
    export let hpMax: number;
    export let index: number;

    $: dead = hp <= 0;
    $: bloodied = hp < (hpMax / 2) && !dead;
    $: extraClasses = bloodied ? "minion-input bloodied" : dead ? "dead" : "minion-hp-input";

    export const logHealthChange: (difference: number, index: number) => void = () => {};

    const onValueChange = (difference: number) => {
        logHealthChange(difference, index);
    }
</script>

<div class="relative">
    <NumberInput bind:value={hp} class={extraClasses} onValueChange={onValueChange}/>
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