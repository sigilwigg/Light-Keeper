const testMapData = {
    widthInTiles: 3,
    heightInTiles: 3,
    tileData: [
        // ----- floor -----
        { x: 0, y: 0, layer: "floor", type: "sidewalk", variation: true },
        { x: 0, y: 1, layer: "floor", type: "sidewalk", variation: true },
        { x: 0, y: 2, layer: "floor", type: "sidewalk", variation: true },

        { x: 1, y: 0, layer: "floor", type: "sidewalk", variation: true },
        { x: 1, y: 1, layer: "floor", type: "grass", variation: false },
        { x: 1, y: 2, layer: "floor", type: "sidewalk", variation: true },

        { x: 2, y: 0, layer: "floor", type: "sidewalk", variation: true },
        { x: 2, y: 1, layer: "floor", type: "sidewalk", variation: true },
        { x: 2, y: 2, layer: "floor", type: "sidewalk", variation: true },

        // ----- objects -----
        { x: 5, y: 5, layer: "obj", type: "shrine", variation: false },
    ]
}