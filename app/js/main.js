let menu = document.getElementById("menu");

menu.onclick = function () {
    let x = document.getElementById("myTopnav");

    if(x.className === "topnav") {
        x.className += " showMenu"
    } else {
        x.className = "topnav"
    }
};