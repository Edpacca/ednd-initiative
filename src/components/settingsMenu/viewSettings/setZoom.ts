export function setZoom(zoomFactor: number) {
    const root = document.querySelector(":root") as HTMLElement;
    root.style.setProperty("--zoom-level", zoomFactor.toString())
}