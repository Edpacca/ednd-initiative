export type PlayerClass = 
"Barbarian" |
"Bard" |
"Cleric" |
"Druid" |
"Fighter" |
"Monk" |
"Paladin" |
"Ranger" |
"Rogue" |
"Sorcerer" |
"Warlock" |
"Wizard" |
"Artificer"

export const PLAYER_CLASSES = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "Artificer"
]

export function getRandomClass(): PlayerClass {
    const index = Math.floor(Math.random() * PLAYER_CLASSES.length)
    return PLAYER_CLASSES[index] as PlayerClass;
}