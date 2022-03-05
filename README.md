# Light Keeper (JS)

**A Game by Pike & Pen:**
- Wyatt H Williams: Code, Gameplay Design, Sprite/Tile Art
- Jacob Murphy: Writing/Worldbuilding, Map Design

**Special Thanks:**
- [Zaebucca](https://twitter.com/zaebucca) for inspiring the artstyle and for a small number of sprites *(which I ripped from Zaebucca's work on Jhoto Redrawn - W.W.)*


## Goal:

Create a game using only vanilla JS, HTML5, and CSS in 6-12 weeks. No external libraries.

**Story?:**

Play as someone in a small village tasked with lighting candles for the dead at night. Lighting each candle lets you read about the dearly departed's life.

The player's candle will dynamically light up the night as they walk around and explore.


## Outline/Todo Sheet:

**Basic Map Stuff:**
- [X] Top down camera, Player sprite animation, Player movement w/ animation
- [X] Tilemap system
- [X] Sprite-based Tiling (tile-sets)
- [ ] Auto-tiling tesselation
- [ ] Player collision

**Lighting**
- [ ] General Lighting
- [ ] Directional Lighting

**Dialouge**
- [ ] Pop-up box
- [ ] Writing text to pop-up box
- [ ] Dialouge box (npc talking)
- [ ] Cinematic Mode (disable inputs);

**Sound**
- [ ] Music Player System
- [ ] Volume Options
- [ ] Foley Sound System


## Devlog:

### Week 1:

<details>
    <summary>
    Top-Down-Movement complete!
    </summary>
    
![top-down walking gif](https://github.com/WyattHWilliams/Light-Keeper/blob/feat-top-down-movement/docs/top-down-movement/top-down.gif)

**How It Was Made:**

After following [this very useful tutorial](https://www.youtube.com/watch?v=H3Fn33lYuE0&ab_channel=DrewConley) to the letter, I re-wrote the code for better readability and seperated out concerns. I also conformed to some organizational best-practices for game development.

The trick to the whole system is using JS to translate the absolutaly fixed player and map elements as you move around. The player never really moves, we actually move the map opposite of the player's input, and then re-draw the player in proper relation to the moved map. The "camera" then hides the overflow, which gives the illusion of player movement!

![img](https://github.com/WyattHWilliams/Light-Keeper/blob/feat-top-down-movement/docs/top-down-movement/Screenshot_1.png)

I seperated input logic, map logic, and player logic into their own classes. This will improve git flow as things get more complicated, but also keep things manageable and tidy-clean for me.

In game development, you also seperate out the different "phases" of each animation step. This mainly has to do with the way game engines run, but for our purposes it does help to keep everything as modular as possible.Therefor I seperated out the draw phase and input handing phases of each game step, with the respective logic also seperated.

```javascript
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
```

</details>

<details>
    <summary>
    The Tile-Map!
    </summary>
    
Why a tile map? By using a tile map I can set myself up for doing cool stuff later with tesselation, sprite animations as part of the terrain, and really really cool stuff involving z-depth(for walking behind objects or seeing if the player is on a hill). Additionaly, my plan for doing some nifty dynamic lighting later involves using a tile based system.

**Basic Tiling**

But first, I don't want to draw every map and then translate it to code every time I need to make a change. My goal is to give the program an array of basic tile information (ie. put grass here, stone floor here, the foundation of a building here) and then let the code figure out tesselation, animations, and extra decorations on its own. Most importantly, I will need to be able to check what kind of tile the floor is periodically, and I want to have the ability to change that floor tile at any time.

Let's start withh the floor tiles. I know that later there will need to have different tile layers for objects, decorations, and special lighting tiles. But for now, let's just make sure we can take in an array of tile data and put all the tiles in the right spot.

some sample map data for us:
```javascript
const testMapData = {
    widthInTiles: 3,
    heightInTiles: 3,
    tileData: [
        { x: 0, y: 0, layer: "floor", type: "sidewalk" },
        { x: 0, y: 1, layer: "floor", type: "sidewalk" },
        { x: 0, y: 2, layer: "floor", type: "sidewalk" },

        { x: 1, y: 0, layer: "floor", type: "sidewalk" },
        { x: 1, y: 1, layer: "floor", type: "grass" },
        { x: 1, y: 2, layer: "floor", type: "sidewalk" },

        { x: 2, y: 0, layer: "floor", type: "sidewalk" },
        { x: 2, y: 1, layer: "floor", type: "sidewalk" },
        { x: 2, y: 2, layer: "floor", type: "sidewalk" },
    ]
}
```

And groovy goomba! After adding some map-gen funcs to our map class:

![tile-map-img](https://github.com/WyattHWilliams/Light-Keeper/blob/feat-tilemap-with-tilesets/docs/tile-map-system/Screenshot_1.png?raw=true)


But these tiles are just divs with a css background color. What about selecting tiles from a tileset??

**Tileset-Based Tiling**

**NOTE:** I also did a pretty fun stress-test to see how many fully-tiled layers I could have on-screen at a time before the browser quit. Which was a suprisingly high number. Then I tested the browser's limits with setting each of those tiles to have it's own sprite animation. Again, a surprisingly high limit(that i'm sure also heavily depends on your computer's gusto as well as the browser). The result of many many 8pixel tiles all animating at once was pretty trippy, unfortunately I forgot to take a screenshot before I moved on. (I was also a fool and deleted the branch ...)

</details>