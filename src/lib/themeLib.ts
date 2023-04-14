import { COLOURS, Themes } from "../data/themeData";

const root = document.querySelector(":root") as HTMLElement;

export function setTheme(theme: Themes) {
    const path = `url(/background/${theme}.webp)`;
    root.style.setProperty("--theme-background", path);
    setColours(theme);
}

function setColours(theme: Themes) {
    const themeColours = COLOURS[theme];
    root.style.setProperty("--primary", themeColours.primary);
    root.style.setProperty("--secondary", themeColours.secondary);
}

export function getThemePath(theme: string) {
    return `url(/background/${theme}.webp)`;
}