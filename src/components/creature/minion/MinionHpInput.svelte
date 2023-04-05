<script lang="ts">
    import Skull from "../../../graphics/icons/skull.svelte";
    import NumberInput from "../../common/values/NumberInput.svelte";

    export let hp: number;
    export let hpMax: number;
    export let minion_index: number;
    export let logHealthChange: (difference: number, index: number) => void = () => {};

    $: dead = hp <= 0;
    $: bloodied = hp < (hpMax / 2) && !dead;
    $: extraClasses = bloodied ? "minion-input bloodied" : dead ? "dead" : "minion-hp-input";


    const onValueChange = (difference: number) => {
        logHealthChange(difference, minion_index);
    }
</script>

<div class="relative">
    <NumberInput bind:value={hp} class={extraClasses} onValueChange={onValueChange}/>
    <div class="healthbar-height-spacer"></div>
    {#if hp <= 0}
        <div class="skull" style={`--i: ${minion_index + 1}`}><Skull/></div>
    {/if}
</div>