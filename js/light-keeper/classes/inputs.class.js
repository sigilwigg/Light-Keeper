class Inputs {
    static held_directions = [];

    static setUpInputEventListeners() {
        document.addEventListener("keydown", (evt) => {
            let dir = KEYS[evt.which];

            if (dir && Inputs.held_directions.indexOf(dir) === -1) {
                Inputs.held_directions.unshift(dir)
            }
        })

        document.addEventListener("keyup", (evt) => {
            let dir = KEYS[evt.which];
            let index = Inputs.held_directions.indexOf(dir);

            if (index > -1) {
                Inputs.held_directions.splice(index, 1);
            }
        })
    }
}