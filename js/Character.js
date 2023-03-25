function initCharacter(imgSrc) {
    const character = {
        img: new Image(),
        draw() {
            document.getElementById("Personaje").appendChild(this.img);
        }
    };
    character.img.src = imgSrc;
    return character;
}

const character = initCharacter("./images/waifu.gif");
character.draw();
