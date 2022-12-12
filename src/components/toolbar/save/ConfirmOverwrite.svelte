<script lang="ts">
    import ConfirmationModal from "../../common/ConfirmationModal.svelte";
    import type { CreatureType } from "../../../lib/models/creature";

    export let name: string;
    export let isOpen: boolean;
    export let overwrite: () => void;
    export let cancel: () => void;

    const text = [
        `A party named ${name} already exists. Are you sure you want to overwrite it?`
    ]

</script>

<ConfirmationModal text={text} isOpen={isOpen} cancelCallback={cancel} confirmaCallback={overwrite}/>