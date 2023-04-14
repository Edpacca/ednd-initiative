<script lang="ts">
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";
    import { reset } from "./reset";

    export let isOpen = false;
    export let close: () => void;

    const text = [
        "Are you sure you want to reset?",
        "This will clear everything currently in the tracker, but will not delete your saved data"
    ]

    const confirmReset = () => {
        reset();
        close();
    }

</script>

<ConfirmationModal 
    text={text}
    isOpen={isOpen}
    confirmaCallback={confirmReset}
    cancelCallback={close}/>