<script lang="ts">
    import { activeEntityTurnIndex } from "../../../store";
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    import { addNewLog, clearLogs } from "../../../lib/logger";
    export let isOpen;
    export let close: () => void;

    const clear = () => {
        clearLogs();
        $activeEntityTurnIndex = 0;
        addNewLog();
        close();
    }

    const text = [
        "Are you sure you want to permanently clear all log history? This will also reset the current round. This will not delete your saved entity data.",
    ]
</script>

<ConfirmationModal isOpen={isOpen} text={text} confirmaCallback={clear} cancelCallback={close}/>