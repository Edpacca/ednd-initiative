<script lang="ts">
    import { activeEntityTurnIndex, addLog, clearLogs } from "../../../store";
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    export let isOpen;
    export let close: () => void;

    const clear = () => {
        clearLogs();
        $activeEntityTurnIndex = 0;
        addLog();
        close();
    }

    const text = [
        "Are you sure you want to permanently clear all log history? This will also reset the current round",
    ]
</script>

<ConfirmationModal isOpen={isOpen} text={text} confirmaCallback={clear} cancelCallback={close}/>