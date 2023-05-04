<script lang="ts">
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    import { setZoom } from "../../../lib/zoom";
    import { zoomLevel } from "../../../store";

    const delta = 0.05;
    const MAX = 2;
    const MIN = 0.5;

    const setLevel = (delta: number) => {
        if (delta > 0) {
            $zoomLevel = Math.min( $zoomLevel + delta, MAX);
            setZoom($zoomLevel);
        } else if (delta < 0) {
            $zoomLevel = Math.max($zoomLevel + delta, MIN);
            setZoom($zoomLevel);
        }
    }
</script>

<div>
    <div class="bold setting-header">Zoom: {($zoomLevel * 100).toFixed(0)}%</div>
    <PlusMinusButton type={"+"} onClick={() => setLevel(delta)} disabled={$zoomLevel >= MAX}/>
    <PlusMinusButton type={"-"} onClick={() => setLevel(-1 * delta)} disabled={$zoomLevel <= MIN}/>
</div>

<style>
    .setting-header {
        margin-bottom: var(--margin);
    }
</style>