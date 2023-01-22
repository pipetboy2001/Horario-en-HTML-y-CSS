function initBackground(imgSrc) {
    var background = {};
    background.img = new Image();
    background.img.src = imgSrc;

    background.draw = function () {
        var bgImage = document.querySelector(".bg-image");
        bgImage.style.backgroundImage = "url(" + background.img.src + ")";
    }
    return background;
}

var background = initBackground("./images/default-background.jpg");
background.draw();
