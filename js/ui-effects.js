$(".table-responsive").hide();
$("#showHours").click(function() {
    $(".table-responsive").slideToggle(800);
});


$("#themeButton").click(function() {
    $("body").toggleClass("dark-mode");
});


$(document).ready(function() {
    $(".size").click(function() {
        $(this).removeClass("btn-outline-dark").addClass("btn-dark selected");
        $(this).siblings().removeClass("btn-dark selected").addClass("btn-outline-dark");
    });
});

$(".thumbnail").click(function() {
    let image = $(this).attr("src");

    $("#mainImage").fadeOut(200, function() {
        $("#mainImage").attr("src", image);
        $("#mainImage").fadeIn(200);
    });
});