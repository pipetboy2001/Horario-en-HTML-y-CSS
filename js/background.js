//Asumir que esta es la funcion que se ejecuta al cambiar el valor de ChangeWalpaper
document.getElementById("change-walpaper").addEventListener("change", changeBackground);

function changeBackground() {
    let imgUrl = document.getElementById("change-walpaper").value;
    document.querySelector('.bg-image').style.backgroundImage = "url(" + imgUrl + ")";
}
