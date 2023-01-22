function initCharacter(imgSrc) {
    var character = {};
    character.img = new Image();
    character.img.src = imgSrc;

    character.draw = function () {
        var personaje = document.getElementById("Personaje");
        personaje.appendChild(character.img);
    }
    return character;
}

var character = initCharacter("./images/waifu.gif");
character.draw();
