<script lang="ts">
    import { activeEntityTurnIndex, currentRound, logs, setCurrentLog } from "../../../store";
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    export let isOpen;
    export let close: () => void;

    const clear = () => {
        $logs = [];
        $currentRound = 1;
        $activeEntityTurnIndex = 0;
        setCurrentLog();
        close();
    }

    const text = [
        "Are you sure you want to permanently clear all log history?",
    ]
</script>

<ConfirmationModal isOpen={isOpen} text={text} confirmaCallback={clear} cancelCallback={close}/>