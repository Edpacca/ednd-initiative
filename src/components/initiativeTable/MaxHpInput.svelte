<script lang="ts">
    import { onMount } from "svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import type { Entity } from "../entity/entity";
    export let entity: Entity;
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