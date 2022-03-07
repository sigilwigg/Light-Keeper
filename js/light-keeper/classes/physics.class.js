class Physics {
    // collision detection algo courtesy of a stack over flow post
    // (I forgot to log the crediting info when I found it.)
    static collisionGetDirection(r1, r2) {
        let dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
        let dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
        let width = (r1.width + r2.width) / 2;
        let height = (r1.height + r2.height) / 2;
        let crossWidth = width * dy;
        let crossHeight = height * dx;

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                return (crossWidth > (-crossHeight)) ? 'up' : 'right';
            } else {
                return (crossWidth > -(crossHeight)) ? 'left' : 'down';
            }
        }
    }
}