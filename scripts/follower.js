const el = $(".card");
$("#top").on("mousemove", function (e) {
    const rotY = -($(window).innerWidth() / 2 - e.pageX) / 8,
        rotX = ($(window).innerHeight() / 2 - e.pageY) / 8  - 20;
    el.attr("style", "transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg);-webkit-transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg);-moz-transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg)");
});

$("#top").on("mouseleave", function () {
  el.attr("style", "transform: rotateY(" + 20 + "deg) rotateX(" + 10 + "deg);");
});

$("#fish").on("click", function () {
    $(".frame").css("cursor", "url(../images/fish24s.png), auto");
});

$("#mouse").on("click", function () {
    $(".frame").css("cursor", "url(../images/mouse24s.png), auto");
});

$("#reset").on("click", function () {
    $(".frame").css("cursor", "default");
});