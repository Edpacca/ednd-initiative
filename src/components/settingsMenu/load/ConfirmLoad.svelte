<script lang="ts">
    import { entities } from "../../../store";
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    import type { Encounter } from "../../../lib/models/encounter";

    export let encounter: Encounter | undefined = undefined;
    export let isOpen;
    export let cancel: () => void;

    const loadEncounter = () => {
        if (encounter) {
            $entities = [...$entities, ...encounter.entities]
        }
        encounter = undefined;
    }

    $: text = [
        `Confirm loading <span class="gold">${encounter?.name}</span> to the initiative tracker?`,
        "This will not ovveride any entities that you have currently in the tracker"
    ]

</script>

<ConfirmationModal 
    isOpen={isOpen}
    text={text}
    confirmaCallback={loadEncounter}
    cancelCallback={cancel}/>