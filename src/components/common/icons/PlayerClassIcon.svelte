<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";
    export let playerClass: PlayerClass;
    export let width = "100%";
</script>

<svg
    class="gold relative"
    width={width} height={width}>
    <use href={`icons/classes.svg#${playerClass.toLowerCase()}`}/>
</svg>
