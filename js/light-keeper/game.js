// ========== [///// DOM SELECTION /////] ==========
const camera = document.querySelector(".camera");
const playerElement = document.querySelector(".player");
const map = document.querySelector(".map");
const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));


// ========== [///// GAME OBJ /////] ==========
let game = {
    pixelSize: pixelSize,
    currentMap: map,
    camera: camera,
    cameraOffsetLeft: pixelSize * 66,
    cameraOffsetTop: pixelSize * 42,
}


