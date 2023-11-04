<script lang="ts">
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    import { resetAll, resetTurns } from "../../../lib/reset";

    export let isOpen = false;
    export let close: () => void;

    const text = [
        "Are you sure you want to reset combat?",
        "This will reset the current combat to turn 0, and clear the combat logs."
    ]

    const confirmReset = () => {
        resetTurns();
        close();
    }

</script>

<ConfirmationModal 
    text={text}
    isOpen={isOpen}
    confirmaCallback={confirmReset}
    cancelCallback={close}/>