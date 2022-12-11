<script lang="ts">
    import { removeLocalStorageParty } from "../../../lib/persistance";
    import ConfirmationModal from "../../common/ConfirmationModal.svelte";
    import type { Party } from "../save/Party";

    export let party: Party | undefined = undefined;
    export let isOpen;
    export let cancel: () => void;

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