
$(function () {

    var redirectList = [];
    redirectList["asraf"] = "https://www.facebook.com/";
    redirectList["uddin"] = "https://www.google.com/";
    redirectList["ahmed"] = "https://www.bing.com/";

    for (var index in redirectList) {
        $("#allPair").prepend("<li>" + index + " -> " + redirectList[index] + "</li>");
    }

});