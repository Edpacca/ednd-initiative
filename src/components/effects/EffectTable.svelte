<script lang="ts">
    import Speed from "../../assets/icons/speed.svelte";
    import { effects } from "../../store";
    import AddRemove from "../common/AddRemove.svelte";
    import { Effect } from "./effect";
    import EffectRowUnlocked from "./EffectRowUnlocked.svelte";

    const addEffect = () => {
        $effects = [...$effects, new Effect()]
    }

    const removeLastEffect = () => {
        $effects = [ ...$effects.slice(0, -1) ]
    }
</script>

<AddRemove add={addEffect} remove={removeLastEffect}/>
<table>
    <thead class="secondary">
        <th class="value-col"></th>
        <th class="full-width">Effect </th>
        <th class="fit-content">Counters</th>
        <th class="value-col"><div class="icon-header svg-fit-container"><Speed/></div></th>
        <th class="value-col"></th>
    </thead>
    <tbody>
        {#each $effects as effect}
            <EffectRowUnlocked effect={effect}/>
        {/each}
    </tbody>
</table>

<style>
    .fit-content {
        width: fit-content;
    }

    .full-width {
        width: 100%;
    }
</style>