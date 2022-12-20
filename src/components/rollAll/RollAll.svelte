<script lang="ts">
    import { dRoll } from "../../lib/dieRoll";
    import type { EntityType } from "../../lib/models/entity";
    import { entities } from "../../store";
    import D20Button from "../common/buttons/D20Button.svelte";

    const rollAll = (typeFilter: EntityType | undefined) => {
        if (!typeFilter) {
            const buffer = $entities.map(e => {
                if (!e.initiative) {
                    e.initiative = dRoll(20);
                }
                return e;
            });

            $entities = buffer;
        }
    }

</script>

<div>
    <D20Button primary="var(--gold)" secondary="var(--white)" width="6rem" onClick={() => rollAll(undefined)}/>
</div>
<div>
    <div>Roll remaining</div>
</div>

<style>

</style>