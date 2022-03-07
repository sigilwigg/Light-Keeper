class Player {
    constructor(_element, _x, _y, _collisionBox) {
        this.element = _element;
        this.x = _x;
        this.y = _y;
        this.collisionBox = _collisionBox
        this.speed = 1;
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${this.x * renderer.pixelSize}px, ${this.y * renderer.pixelSize}px, 0 )`;
    }

    handleMovement() {
        const held_direction = Inputs.held_directions[0];
        let projectedPlacement = this.collisionBox.getBoundingClientRect();

        function checkForCollision(projection) {
            // ----- list for mult. collision directions -----
            let collisionList = [];
            let collision = undefined;

            // ----- check map objects -----
            for (let key in map.tiles.obj) {
                collision = Physics.collisionDirection(
                    projection,
                    map.tiles.obj[key].element.getBoundingClientRect()
                )
                if (collision) collisionList.push(collision);
            }

            return collisionList;
        }

        if (held_direction) {
            switch (held_direction) {
                case DIRECTIONS.right:
                    projectedPlacement.x += this.speed;
                    if (!checkForCollision(projectedPlacement).includes(held_direction)) {
                        this.x += this.speed;
                    }
                    break;
                case DIRECTIONS.left:
                    projectedPlacement.x -= this.speed;
                    if (!checkForCollision(projectedPlacement).includes(held_direction)) {
                        this.x -= this.speed;
                    }
                    break;
                case DIRECTIONS.down:
                    projectedPlacement.y += this.speed;
                    if (!checkForCollision(projectedPlacement).includes(held_direction)) {
                        this.y += this.speed;
                    }
                    break;
                case DIRECTIONS.up:
                    projectedPlacement.y -= this.speed;
                    if (!checkForCollision(projectedPlacement).includes(held_direction)) {
                        this.y -= this.speed;
                    }
                    break;
            }
            this.element.setAttribute("facing", held_direction);
        }

        this.element.setAttribute("walking", held_direction ? "true" : "false");
    }
}