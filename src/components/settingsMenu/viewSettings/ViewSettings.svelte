<script lang="ts">
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";

    let level = 100;
    const delta = 1
    20;
    const MAX = 200;
    const MIN = 50;

    const setLevel = (delta: number) => {
        if (delta > 0) {
            level = Math.min(level + delta, MAX)
        } else if (delta < 0) {
            level = Math.max(level + delta, MIN)
        }
    }
</script>

<div>
    <div class="bold setting-header">Zoom: {level}%</div>
    <PlusMinusButton type={"+"} onClick={() => setLevel(delta)} disabled={level >= MAX}/>
    <PlusMinusButton type={"-"} onClick={() => setLevel(-1 * delta)} disabled={level <= MIN}/>
</div>

<style>
    .setting-header {
        margin-bottom: var(--margin);
    }
</style>