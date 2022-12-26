<script lang="ts">
    import { isLocked, isStarted } from "../../store";
    import LockedSwordsIcon from "../lockToggle/LockedSwordsIcon.svelte";

    const toggleLock = () => {
        if (!$isStarted) {
            $isStarted = true;
        }
        $isLocked = !$isLocked;
    }

</script>

<LockedSwordsIcon isLocked={$isLocked} onClick={toggleLock}/>