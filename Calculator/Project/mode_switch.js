function light_switch(){
    element = document.getElementById("mode_switch")
    if (element.classList.contains("night")){
        element.addClass('day');
        element.classList.remove("night");
    }
    else{
        element.addClass('night');
        element.classList.remove("day");
    }
};