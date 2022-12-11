<script lang="ts">
    import { clearLocalStorage } from "../../../lib/persistance";
    import ConfirmationModal from "../../common/ConfirmationModal.svelte";
    import { reset } from "./reset";
    export let isOpen;
    export let close: () => void;

    const clear = () => {
        clearLocalStorage();
        reset();
        isOpen = false;
    }

    const text = [
        "Are you sure you want to permanently delete all saved data?",
        "This will also remove everything that is currently in the tracker."
    ]
</script>

<ConfirmationModal isOpen={isOpen} text={text} confirmaCallback={clear} cancelCallback={close}/>