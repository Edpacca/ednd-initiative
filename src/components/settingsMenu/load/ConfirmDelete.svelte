<script lang="ts">
    import { removeLocalStorageParty } from "../../../lib/persistance";
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    import type { Encounter } from "../../../lib/models/encounter";

    export let party: Encounter | undefined = undefined;
    export let cancel: () => void;
    export let isOpen;

    const deleteParty = () => {
        if (party) {
            removeLocalStorageParty(party.name);
        }
        party = undefined;
    }

    const text = [
        `Are you sure you want to delete the party named: ${party?.name}`,
        "There are no takebacks or divine interventions"
    ]
</script>

<ConfirmationModal 
    isOpen={isOpen}
    text={text}
    confirmaCallback={deleteParty}
    cancelCallback={cancel}/>