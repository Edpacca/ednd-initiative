<script lang="ts">
    import { clearLocalStorage } from "../../../lib/persistance";
    import { isLocked, isStarted } from "../../../store";
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    import { clearLogs } from "../../../lib/logger";
    import { reset } from "../../../lib/reset";
    export let isOpen;
    export let close: () => void;

    const clear = () => {
        clearLocalStorage();
        close();
        $isStarted = false;
        $isLocked = false;
    }

    const text = [
        "Are you sure you want to permanently delete all saved data?",
        "This will also not clear the tracker or your log data."
    ]
</script>

<ConfirmationModal isOpen={isOpen} text={text} confirmaCallback={clear} cancelCallback={close}/>