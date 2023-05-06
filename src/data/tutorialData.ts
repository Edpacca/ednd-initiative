export enum TutorialStage {
    None,
    AddingPlayers,
    AddingEnemies,
    AddingEffects,
    RollAll,
    Ready,
    Combat,
    ConfirmContinue,
    Logs,
    Saving,
    End
}

export function getTutorialStageString(stage: TutorialStage): string {
    switch (stage) {
        case TutorialStage.AddingPlayers:
            return "Adding Players";
        case TutorialStage.AddingEnemies:
            return "Adding Enemies";
        case TutorialStage.AddingEffects:
            return "Adding Effects";
        case TutorialStage.RollAll:
            return "Rolling Initiative";
        case TutorialStage.Ready:
            return "Starting Combat";
        case TutorialStage.Combat:
            return "Combat Tools";
        case TutorialStage.Logs:
            return "Turn History";
        case TutorialStage.Saving:
            return "Saving/Loading";
        default:
            return ""
    }
}