<script lang="ts">
    import ConfirmationModal from "../../common/modal/ConfirmationModal.svelte";

    export let name: string;
    export let isOpen: boolean;
    export let overwrite: () => void;
    export let cancel: () => void;

    const text = [
        `A party named ${name} already exists. Are you sure you want to overwrite it?`
    ]

</script>

<ConfirmationModal text={text} isOpen={isOpen} cancelCallback={cancel} confirmaCallback={overwrite}/>