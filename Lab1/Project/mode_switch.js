$("#mode_switch").click(function() {
    if ($("#mode_switch").classList.contains("night")){
        $("#mode_switch").addClass('day');
        $("#mode_switch").classList.remove("night");
    }
    else{
        $("#mode_switch").addClass('night');
        $("#mode_switch").classList.remove("day");
    }
  });