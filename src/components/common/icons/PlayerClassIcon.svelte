<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";

    export let icon: PlayerClass;
    const path = `classes/${icon.toLowerCase()}.svg#icon`;
</script>

<div class="svg-fit-container class-icon">
    <svg class="svg-fit">
        <use xlink:href={path} href={path}></use>
     </svg>
</div>

<style>
    .class-icon {
        fill: var(--gold);
        filter: drop-shadow(0 0 0.125rem black)
    }
</style>