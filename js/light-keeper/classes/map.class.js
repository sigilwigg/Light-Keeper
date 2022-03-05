class Map {
    constructor(_element, _mapData) {
        this.element = _element;
        this.tiles = {};

        this.generateMap(_mapData);
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${-player.x * renderer.pixelSize + renderer.cameraOffsetLeft}px, ${-player.y * renderer.pixelSize + renderer.cameraOffsetTop}px, 0 )`;
    }

    makeTile(tile) {
        let newTile = document.createElement("div");
        let mapLayer = this.element.querySelector(`.tile-layer.${tile.layer}`);

        newTile.classList.add("tile")
        newTile.classList.add(`${tile.type}`);
        newTile.style.top = `${tile.y * renderer.tileSize}px`;
        newTile.style.left = `${tile.x * renderer.tileSize}px`;

        mapLayer.append(newTile);

        return newTile;
    }

    generateTiles(tileData) {
        tileData.forEach(tile => {
            let tileElement = this.makeTile(tile);

            this.tiles[`${tile.x},${tile.y}`] = {
                x: tile.x,
                y: tile.y,
                layer: tile.layer,
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