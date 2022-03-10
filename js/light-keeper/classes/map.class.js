class Map {
    constructor(
        _element,
        _mapData,
        _floorLightingElement,
        _objLightingElement
    ) {
        this.element = _element;
        this.lighting = {
            floor: _floorLightingElement,
            obj: _objLightingElement,
        }
        this.tiles = {
            floor: {},
            floorDeco: {},
            obj: {},
            objDeco: {},
        };

        this.generateMap(_mapData);
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${-player.x * renderer.pixelSize + renderer.cameraOffsetLeft}px, ${-player.y * renderer.pixelSize + renderer.cameraOffsetTop}px, 0 )`;

        let lightingOffsetLeft = player.x * renderer.pixelSize - renderer.cameraOffsetLeft - (player.width / 2.75);
        let lightingOffsetRight = player.y * renderer.pixelSize - renderer.cameraOffsetTop - (player.height)

        this.lighting.floor.style.transform = `translate3d( ${lightingOffsetLeft}px, ${lightingOffsetRight}px, 0 )`;

        this.lighting.obj.style.transform = `translate3d( ${lightingOffsetLeft}px, ${lightingOffsetRight}px, 0 )`;
    }

    makeTile(tile) {
        // ----- make the elements -----
        let newTile = document.createElement("div");
        let newTileset = document.createElement("div");
        let mapLayer = this.element.querySelector(`.tile-layer.${tile.layer}`);

        // ----- assign tile class -----
        newTile.classList.add("tile")

        // ----- position the tile -----
        newTile.style.top = `${tile.y * renderer.tileSize}px`;
        newTile.style.left = `${tile.x * renderer.tileSize}px`;

        // ----- assign tileset classes -----
        newTileset.classList.add("pixel-art");
        newTileset.classList.add(`${tile.type}`)

        // ----- set tile variation -----
        /*  this is a class that moves the background
        *   to a specific tile in the set
        */
        if (tile.variation == true) {
            let vNum = Math.floor(Math.random() * 3 + 1);
            newTileset.classList.add(`v-${vNum}`);
        }

        // ----- finish and add to map -----
        newTile.append(newTileset);
        mapLayer.append(newTile);

        return newTile;
    }

    generateTiles(tileData) {
        tileData.forEach(tile => {
            let tileElement = this.makeTile(tile);

            this.tiles[`${tile.layer}`][`${tile.x},${tile.y}`] = {
                x: tile.x,
                y: tile.y,
                type: tile.type,
                element: tileElement,
            }
        });
    }

    generateMap(mapData) {
        // ----- modify the css root vars -----
        document.documentElement.style.setProperty('--tiles-width', `${mapData.widthInTiles}`);
        document.documentElement.style.setProperty('--tiles-height', `${mapData.heightInTiles}`);

        // ----- populate the map with the tiles -----
        this.generateTiles(mapData.tileData);
    }
}