<script lang="ts">
    import { isLocked, isLogsOpen, isStarted, isTutorialOpen } from "../../store";
    import LockedSwordsIcon from "./LockedSwordsIcon.svelte";

    const toggleLock = () => {
        if (!$isStarted && !$isTutorialOpen) {
            $isStarted = true;
            // $isLogsOpen = true;
        }
        $isLocked = !$isLocked;
    }

</script>

<LockedSwordsIcon isLocked={$isLocked} onClick={toggleLock}/>