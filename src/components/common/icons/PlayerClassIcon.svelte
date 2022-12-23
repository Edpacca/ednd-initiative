<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";

    export let icon: PlayerClass;
    const path = `classes/${icon.toLowerCase()}.svg#icon`;
</script>

<svg width="100%" height="100%" class="class-icon">
    <use xlink:href={path} href={path}></use>
</svg>

<style>
    .class-icon {
        fill: var(--gold);
        filter: drop-shadow(0 0 0.125rem black);
    }
</style>