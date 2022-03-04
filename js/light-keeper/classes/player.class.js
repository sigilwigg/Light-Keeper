class Player {
    constructor(_element, _x, _y, _width, _height, _collision_box) {
        this.element = _element;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.speed = 1;
    }

    drawSelf() {
        this.element.style.transform = `translate3d( ${this.x * game.pixelSize}px, ${this.y * game.pixelSize}px, 0 )`;
    }

    handleMovement() {
        const held_direction = Inputs.held_directions[0];

        if (held_direction) {
            switch (held_direction) {
                case DIRECTIONS.right:
                    this.x += this.speed;
                    break;
                case DIRECTIONS.left:
                    this.x -= this.speed;
                    break;
                case DIRECTIONS.down:
                    this.y += this.speed;
                    break;
                case DIRECTIONS.up:
                    this.y -= this.speed;
                    break;
            }
            this.element.setAttribute("facing", held_direction);
        }

        this.element.setAttribute("walking", held_direction ? "true" : "false");
    }
}