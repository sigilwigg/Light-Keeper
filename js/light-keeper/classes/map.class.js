class Map {
    constructor(_element, _mapData) {
        this.element = _element;
        this.tiles = {
            floor: {},
            floorDeco: {},
            floorLighting: {},
            obj: {},
            objDeco: {},
        };

        this.generateMap(_mapData);
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${-player.x * renderer.pixelSize + renderer.cameraOffsetLeft}px, ${-player.y * renderer.pixelSize + renderer.cameraOffsetTop}px, 0 )`;
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

        if (tile.attr) {
            newTileset.setAttribute(`${tile.attr.name}`, tile.attr.val);
        }

        // ----- finish and add to map -----
        newTile.append(newTileset);
        mapLayer.append(newTile);

        return newTile;
    }

    generateTiles(tileData) {
        tileData.forEach(tile => {
            let tileElement = this.makeTile(tile);

            // ----- set the map tile data -----
            this.tiles[`${tile.layer}`][`${tile.x},${tile.y}`] = {
                x: tile.x,
                y: tile.y,
                type: tile.type,
                element: tileElement,
            }

            // ----- add floor lighting above floor tiles -----
            if (tile.layer == "floor") {
                let lightElement = this.makeTile({
                    x: tile.x,
                    y: tile.y,
                    layer: "floorLighting",
                    type: "lighting",
                    attr: { name: "lightLevel", val: 0 }
                })

                // ----- set the lighting tile in map tile data -----
                this.tiles["floorLighting"][`${tile.x},${tile.y}`] = {
                    x: tile.x,
                    y: tile.y,
                    type: "lighting",
                    element: lightElement,
                }
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

    setLightLevel(tileKey, lightLevel) {
        if (!map.tiles.floorLighting[tileKey]) return;
        map.tiles.floorLighting[tileKey].element.firstElementChild.setAttribute("lightLevel", `${lightLevel}`);
    }

    updateLighting() {
        let [pTileX, pTileY] = player.getTilePosition();
        let light3 = [[pTileX, pTileY]]
        let light2 = [[pTileX - 1, pTileY + 1], [pTileX, pTileY + 1], [pTileX + 1, pTileY + 1], [pTileX - 1, pTileY], [pTileX + 1, pTileY],
        [pTileX - 1, pTileY - 1], [pTileX, pTileY - 1], [pTileX + 1, pTileY - 1],]

        let light1 = [
            [pTileX - 2, pTileY + 2], [pTileX - 1, pTileY + 2], [pTileX, pTileY + 2], [pTileX + 1, pTileY + 2], [pTileX + 2, pTileY + 2],
            [pTileX - 2, pTileY + 1], [pTileX + 2, pTileY + 1],
            [pTileX - 2, pTileY], [pTileX + 2, pTileY],
            [pTileX - 2, pTileY - 1], [pTileX + 2, pTileY - 1],
            [pTileX - 2, pTileY - 2], [pTileX - 1, pTileY - 2], [pTileX, pTileY - 2], [pTileX + 1, pTileY - 2], [pTileX + 2, pTileY - 2],
        ]

        let light0 = [
            [pTileX - 3, pTileY + 3], [pTileX - 2, pTileY + 3], [pTileX - 1, pTileY + 3], [pTileX, pTileY + 3], [pTileX + 1, pTileY + 3], [pTileX + 2, pTileY + 3], [pTileX + 3, pTileY + 3],
            [pTileX - 3, pTileY + 2], [pTileX + 3, pTileY + 2],
            [pTileX - 3, pTileY + 1], [pTileX + 3, pTileY + 1],
            [pTileX - 3, pTileY], [pTileX + 3, pTileY],
            [pTileX - 3, pTileY - 1], [pTileX + 3, pTileY - 1],
            [pTileX - 3, pTileY - 2], [pTileX + 3, pTileY - 2],
            [pTileX - 3, pTileY - 3], [pTileX - 2, pTileY - 3], [pTileX - 1, pTileY - 3], [pTileX, pTileY - 3], [pTileX + 1, pTileY - 3], [pTileX + 2, pTileY - 3], [pTileX + 3, pTileY - 3],
        ]

        light3.forEach(point => {
            this.setLightLevel(`${point[0]},${point[1]}`, 3)
        });
        light2.forEach(point => {
            this.setLightLevel(`${point[0]},${point[1]}`, 2)
        });
        light1.forEach(point => {
            this.setLightLevel(`${point[0]},${point[1]}`, 1)
        });
        light0.forEach(point => {
            this.setLightLevel(`${point[0]},${point[1]}`, 0)
        });
    }
}