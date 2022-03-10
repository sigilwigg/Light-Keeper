// ========== [///// DOM SELECTION /////] ==========
const camera = document.querySelector(".camera");
const playerElement = document.querySelector(".player");
const playerCollisionBox = document.querySelector(".player .collision-box");
const mapElement = document.querySelector(".map");
const floorLightingElement = document.querySelector(".floor-lighting");
const objLightingElement = document.querySelector(".obj-lighting");
const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));


// ========== [///// INITIALIZATION /////] ==========
// ----- render obj init -----
let renderer = {
    pixelSize: pixelSize,
    tileSize: pixelSize * 8,
    camera: camera,
    cameraOffsetLeft: pixelSize * 66,
    cameraOffsetTop: pixelSize * 42,
}

// ----- player init -----
let player = new Player(
    playerElement,
    0, 0,
    playerCollisionBox,
)

// ----- map init -----
let map = new Map(
    mapElement,
    testMapData,
    floorLightingElement,
    objLightingElement
);

// ----- input init -----
Inputs.setUpInputEventListeners();


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