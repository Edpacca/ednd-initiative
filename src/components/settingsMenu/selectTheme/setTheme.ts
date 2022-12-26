export function setTheme(theme: string) {
    const path = `url(/background/${theme}.webp)`
    document.body.style.backgroundImage = path;
}

export function getThemePath(theme: string) {
    return `url(/background/${theme}.webp)`;
}