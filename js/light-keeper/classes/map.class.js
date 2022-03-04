class Map {
    constructor(_element) {
        this.element = _element;
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${-player.x * renderer.pixelSize + renderer.cameraOffsetLeft}px, ${-player.y * renderer.pixelSize + renderer.cameraOffsetTop}px, 0 )`;
    }
}