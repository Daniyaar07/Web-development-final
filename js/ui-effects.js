$(".table-responsive").hide();
$("#showHours").click(function() {
    $(".table-responsive").slideToggle(800);
});


$("#themeButton").click(function() {
    $("body").toggleClass("dark-mode");
});