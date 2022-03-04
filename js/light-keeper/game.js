// ========== [///// DOM SELECTION /////] ==========
const camera = document.querySelector(".camera");
const playerElement = document.querySelector(".player");
const mapElement = document.querySelector(".map");
const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));


// ========== [///// INITIALIZATION /////] ==========
// ----- player init -----
let player = new Player(
    playerElement,
    0, 0,
    parseInt(getComputedStyle(playerElement).getPropertyValue('width')),
    parseInt(getComputedStyle(playerElement).getPropertyValue('height'))
)

// ----- map init -----
let map = new Map(mapElement);

// ----- input init -----
Inputs.setUpInputEventListeners();

// ----- game obj init -----
let game = {
    pixelSize: pixelSize,
    camera: camera,
    cameraOffsetLeft: pixelSize * 66,
    cameraOffsetTop: pixelSize * 42,
}


// ========== [///// GAME LOOP /////] ==========
const step = () => {
    // ----- event phase -----
    player.handleMovement();

    // ----- draw phase -----
    player.drawSelf();
    map.drawSelf();

    // ----- next step -----
    window.requestAnimationFrame(() => {
        step();
    })
}


// ========== [///// START GAME /////] ==========
step();