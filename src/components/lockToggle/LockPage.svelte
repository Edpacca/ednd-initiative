<script lang="ts">
    import { isLocked, isLogsOpen, isStarted, showTutorial } from "../../store";
    import LockedSwordsIcon from "./LockedSwordsIcon.svelte";

    const toggleLock = () => {
        if (!$isStarted && !$showTutorial) {
            $isStarted = true;
            // $isLogsOpen = true;
        }
        $isLocked = !$isLocked;
    }

</script>

<LockedSwordsIcon isLocked={$isLocked} onClick={toggleLock}/>