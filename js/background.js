class Background {
    constructor(imgSrc) {
        this.img = new Image();
        this.img.src = imgSrc;
    }
    draw() {
        const bgImage = document.querySelector(".bg-image");
        bgImage.style.backgroundImage = `url(${this.img.src})`;
    }
}

const background = new Background("./images/default-background.jpg");
background.draw();
