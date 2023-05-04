export enum Themes {
    COBBLES = "cobbles",
    DIRT = "dirt",
    HELL = "hell",
    ICE = "ice",
    LAVA = "lava",
    SAND = "sand",
    STONE = "stone",
    WATER = "water"
}

export interface ColourPallete {
    primary: string, // Darker colour
    secondary: string // Lighter colour
}

export const DEFAULT_THEME: Themes = Themes.STONE;

export const DEFAULT_PRIMARY = "brown"
export const DEFAULT_SECONDARY = "burlywood"

export const DEFAULT_COLOURS: ColourPallete = {
    primary: DEFAULT_PRIMARY,
    secondary: DEFAULT_SECONDARY
}

export const THEMES = Object.values(Themes);

export const COLOURS: {[key in Themes]: ColourPallete} = {

    "stone": DEFAULT_COLOURS,

    "cobbles": DEFAULT_COLOURS,

    "dirt": {
        primary: "green",
        secondary: DEFAULT_SECONDARY
    },

    "hell": {
        primary: "maroon",
        secondary: "red"
    },

    "ice": {
        primary: "darkCyan",
        secondary: "powderBlue"
    },

    "lava": {
        primary: "darkRed",
        secondary: "darkOrange"
    },

    "sand": {
        primary: "darkOrange",
        secondary: "blanchedAlmond"
    },

    "water": {
        primary: "seaGreen",
        secondary: "turquoise"
    }
}