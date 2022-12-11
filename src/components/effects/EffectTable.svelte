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
        <th>Effect</th>
        <th class="value-col"><div class="icon-header svg-fit-container"><Speed/></div></th>
        <th class="fn-col"></th>
    </thead>
    <tbody>
        {#each $effects as effect}
            <EffectRowUnlocked effect={effect}/>
        {/each}
    </tbody>
</table>