function makeShrine(x, y) {
    return [
        { x: x, y: y, layer: "obj", type: "shrine", variation: false },
        { x: x, y: (y - 1), layer: "obj-deco", type: "shrine", variation: false },
    ]
}

function makeTree(x, y, color) {
    return [
        // ----- base -----
        { x: x, y: y, layer: "obj", type: `tree-${color}`, variation: "base-c" },
        { x: x - 1, y: y, layer: "obj", type: `tree-${color}`, variation: "base-l" },
        { x: x + 1, y: y, layer: "obj", type: `tree-${color}`, variation: "base-r" },
        // ----- trunk bottom -----
        { x: x, y: y - 1, layer: "obj", type: `tree-${color}`, variation: "trunk-bot" },
        { x: x - 1, y: y - 1, layer: "obj-deco", type: `tree-${color}`, variation: "trunk-l" },
        { x: x + 1, y: y - 1, layer: "obj-deco", type: `tree-${color}`, variation: "trunk-r" },
        // ----- trunk top -----
        { x: x, y: y - 2, layer: "obj-deco", type: `tree-${color}`, variation: "trunk-top" },
        { x: x - 1, y: y - 2, layer: "obj-deco", type: `tree-${color}`, variation: "trunk-leaves-l" },
        { x: x + 1, y: y - 2, layer: "obj-deco", type: `tree-${color}`, variation: "trunk-leaves-r" },
        // ----- trunk leaves -----
        { x: x, y: y - 3, layer: "obj-deco", type: `tree-${color}`, variation: "leaves-c" },
        { x: x - 1, y: y - 3, layer: "obj-deco", type: `tree-${color}`, variation: "leaves-l" },
        { x: x + 1, y: y - 3, layer: "obj-deco", type: `tree-${color}`, variation: "leaves-r" },
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

    data = [...data, ...makeShrine(1, 5)]
    data = [...data, ...makeTree(5, 5, "purple")]
    data = [...data, ...makeTree(11, 5, "purple")]
    data = [...data, ...makeTree(4, 7, "purple")]
    data = [...data, ...makeTree(12, 7, "purple")]
    data = [...data, ...makeTree(5, 9, "purple")]
    data = [...data, ...makeTree(11, 9, "purple")]
    data = [...data, ...makeTree(4, 11, "purple")]
    data = [...data, ...makeTree(12, 11, "purple")]
    data = [...data, ...makeTree(5, 13, "purple")]
    data = [...data, ...makeTree(11, 13, "purple")]

    return {
        widthInTiles: 13,
        heightInTiles: 13,
        tileData: data
    }
}

let testMapData = makeTestMap();