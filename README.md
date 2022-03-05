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
- [ ] Tilemap system
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

**Top-Down-Movement complete!**
    
    ![alt text](https://github.com/WyattHWilliams/Light-Keeper/blob/feat-top-down-movement/docs/top-down-movement/top-down.gif)

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