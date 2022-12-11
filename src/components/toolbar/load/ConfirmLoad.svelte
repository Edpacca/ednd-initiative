<script lang="ts">
    import { entities } from "../../../store";
    import ConfirmationModal from "../../common/ConfirmationModal.svelte";
    import type { Party } from "../save/Party";

    export let party: Party | undefined = undefined;
    export let isOpen;
    export let cancel: () => void;

    const loadParty = () => {
        if (party) {
            $entities = [...$entities, ...party.party]
        }
        party = undefined;
    }

    const text = [
        `Confirm loading ${party?.name} to the initiative tracker?`,
        "This will not ovveride any entities that you have currently in the tracker"
    ]

</script>

<ConfirmationModal 
    isOpen={isOpen}
    text={text}
    confirmaCallback={loadParty}
    cancelCallback={cancel}/>