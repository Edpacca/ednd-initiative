export function setTheme(theme: string) {
    const path = `url(/background/${theme}.webp)`
    document.body.style.background = path;
}