class Map {
    constructor(_element) {
        this.element = _element;
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${-player.x * game.pixelSize + game.cameraOffsetLeft}px, ${-player.y * game.pixelSize + game.cameraOffsetTop}px, 0 )`;
    }
}