import { isTutorialCompleted, isTutorialOpen } from "../store";
import { setLocalStorageTutorialCompleted } from "./persistance";

export function closeTutorial () {
    isTutorialOpen.set(false);
    isTutorialCompleted.set(true);
    setLocalStorageTutorialCompleted(true);
}