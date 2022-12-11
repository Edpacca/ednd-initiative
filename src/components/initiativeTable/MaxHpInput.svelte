<script lang="ts">
    import NumberInput from "../common/NumberInput.svelte";
    import type { Creature } from "../../models/creature";
    export let entity: Creature;
    export let setHpCurrent: (hp: number) => void;
    export let value;
    export let isHidden = false;

    let valueBuffer = entity.hpMax;
    const validateAndSetHp = (newValue: number) => {
        if (valueBuffer !== newValue) {
            valueBuffer = newValue;
            setHpCurrent(valueBuffer);
        }
    }
    
    $: validateAndSetHp(value);
</script>

<NumberInput bind:value={value} isHidden={isHidden}/>