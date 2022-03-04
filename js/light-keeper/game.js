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


// ========== [///// INITIALIZATION /////] ==========
// ----- player init -----
let player = new Player(
    playerElement,
    0, 0,
    parseInt(getComputedStyle(playerElement).getPropertyValue('width')),
    parseInt(getComputedStyle(playerElement).getPropertyValue('height'))
)

// ----- input init -----
Inputs.setUpInputEventListeners();


// ========== [///// GAME LOOP /////] ==========
const step = () => {
    player.handleMovement();

    window.requestAnimationFrame(() => {
        step();
    })
}


// ========== [///// START GAME /////] ==========
step();