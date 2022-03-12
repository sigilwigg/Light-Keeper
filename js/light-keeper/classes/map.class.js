class Map {
    constructor(
        _element,
        _mapData,
        _floorLightingElement,
        _objLightingElement
    ) {
        this.element = _element;
        this.lighting = {
            "floor": _floorLightingElement,
            "obj": _objLightingElement,
        }
        this.tiles = {
            "floor": {},
            "floor-deco": {},
            "obj": {},
            "obj-deco": {},
        };

        this.generateMap(_mapData);
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${-player.x * renderer.pixelSize + renderer.cameraOffsetLeft}px, ${-player.y * renderer.pixelSize + renderer.cameraOffsetTop}px, 0 )`;

        let lightingOffsetLeft = player.x * renderer.pixelSize - renderer.cameraOffsetLeft;
        let lightingOffsetTop = player.y * renderer.pixelSize - renderer.cameraOffsetTop

        this.lighting.floor.style.transform = `translate3d( ${lightingOffsetLeft}px, ${lightingOffsetTop}px, 0 )`;

        this.lighting.obj.style.transform = `translate3d( ${lightingOffsetLeft}px, ${lightingOffsetTop}px, 0 )`;
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
        if (tile.variation == true) {
            let vNum = Math.floor(Math.random() * 3 + 1);
            newTileset.classList.add(`v-${vNum}`);
        } else
            if (typeof (tile.variation) == "string") {
                newTileset.classList.add(tile.variation);
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

    setObjLightDir(coords, val) {
        this.tiles["obj"][coords].element.firstChild.setAttribute("light-dir", val);

        if (this.tiles["obj"][coords].type == "shrine") {
            this.tiles["obj-deco"][`${coords[0]},${parseInt(coords[2]) - 1}`].element.firstChild.setAttribute("light-dir", val);
        }
    }

    updateLighting() {
        let [pTileX, pTileY] = player.getTilePosition();
        let lightDistance = 4;
        let TL, TR, BL, BR;
        let tileDistance = 1;
        let coords = ""

        function checkCurDist(i, ld, d) {
            // if (i <= 1) return 0;
            if (i >= ld + 1) return 1;
            return d;
        }

        for (let i = 1; i <= lightDistance + 1; i++) {
            TL = [pTileX - i, pTileY - i];
            TR = [pTileX + i, pTileY - i];
            BL = [pTileX - i, pTileY + i];
            BR = [pTileX + i, pTileY + i];

            tileDistance = (pTileX + i) - (pTileX - i);

            for (let t = 1; t < tileDistance; t++) {
                // ----- TL -----
                coords = `${TL[0]},${TL[1]}`;
                if (this.tiles.obj[coords]) {
                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "TL")
                    )
                }

                // ----- TR -----
                coords = `${TR[0]},${TR[1]}`;
                if (this.tiles.obj[coords]) {
                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "TR")
                    )
                }

                // ----- BL -----
                coords = `${BL[0]},${BL[1]}`;
                if (this.tiles.obj[coords]) {
                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "BL")
                    )
                }

                // ----- BR -----
                coords = `${BR[0]},${BR[1]}`
                if (this.tiles.obj[coords]) {
                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "BR")
                    )
                }

                // ----- below player -----
                coords = `${BL[0] + t},${BL[1]}`;
                if (this.tiles.obj[coords]) {

                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "B")
                    )
                }

                // ----- above player -----
                coords = `${TL[0] + t},${TL[1]}`;
                if (this.tiles.obj[coords]) {

                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "T")
                    )
                }

                // ----- left of player -----
                coords = `${TL[0]},${BL[1] - t}`;
                if (this.tiles.obj[coords]) {

                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "L")
                    )
                }

                // ----- right of player -----
                coords = `${TR[0]},${BR[1] - t}`;
                if (this.tiles.obj[coords]) {

                    this.setObjLightDir(
                        coords,
                        checkCurDist(i, lightDistance, "R")
                    )
                }
            }
        }
    }
}