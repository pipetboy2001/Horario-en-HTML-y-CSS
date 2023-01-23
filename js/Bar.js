class Bar {
    constructor(x, y, width, height, colour) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.desiredPos = this.height;
    }

    draw(horizontal, vertical) {
        ctx.fillRect(this.x + horizontal, this.y + vertical, this.width, this.height);
    }

    update() {
        if (this.height < this.desiredPos) {
            this.height += (this.desiredPos - this.height) / settings.bars.smoothingFactor;
        } else if (this.height > this.desiredPos) {
            this.height -= (this.height - this.desiredPos) / settings.bars.smoothingFactor;
        }
        this.y = canvas.height / 2 - this.height;
    }
}