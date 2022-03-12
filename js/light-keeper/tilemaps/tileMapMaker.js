function makeShrine(x, y) {
    return [
        { x: x, y: y, layer: "obj", type: "shrine", variation: false },
        { x: x, y: (y - 1), layer: "obj-deco", type: "shrine", variation: false },
    ]
}

function makeTree(x, y) {
    return [
        // ----- base -----
        { x: x, y: y, layer: "obj", type: "tree-green", variation: "base-c" },
        { x: x - 1, y: y, layer: "obj", type: "tree-green", variation: "base-l" },
        { x: x + 1, y: y, layer: "obj", type: "tree-green", variation: "base-r" },
        // ----- trunk bottom -----
        { x: x, y: y - 1, layer: "obj", type: "tree-green", variation: "trunk-bot" },
        { x: x - 1, y: y - 1, layer: "obj-deco", type: "tree-green", variation: "trunk-l" },
        { x: x + 1, y: y - 1, layer: "obj-deco", type: "tree-green", variation: "trunk-r" },
        // ----- trunk top -----
        { x: x, y: y - 2, layer: "obj", type: "tree-green", variation: "trunk-top" },
        { x: x - 1, y: y - 2, layer: "obj-deco", type: "tree-green", variation: "trunk-l" },
        { x: x + 1, y: y - 2, layer: "obj-deco", type: "tree-green", variation: "trunk-r" },
    ]
}

function makeTestMap() {
    let data = [];

    for (let x = 0; x < 14; x++) {
        for (let y = 0; y < 14; y++) {
            data.push(
                { x: x, y: y, layer: "floor", type: "sidewalk", variation: true },
            )
        }
    }

    data = [...data, ...makeShrine(5, 5)]
    data = [...data, ...makeTree(11, 5)]
    console.log(data)

    return {
        widthInTiles: 13,
        heightInTiles: 13,
        tileData: data
    }
}