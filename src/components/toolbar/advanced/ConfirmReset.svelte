<script lang="ts">
    import ConfirmationModal from "../../common/ConfirmationModal.svelte";
    import { reset } from "./reset";

    export let isOpen = false;
    export let close: () => void;

    const text = [
        "Are you sure you want to reset?",
        "This will clear everything currently in the tracker and reset your theme, but will not delete your saved data"
    ]

</script>

<ConfirmationModal 
    text={text}
    isOpen={isOpen}
    confirmaCallback={reset}
    cancelCallback={close}/>