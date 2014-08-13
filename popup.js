
var storedData;

$(function () {

    var redirectList;
    chrome.storage.sync.get(function (items) {
        storedData = items;
        redirectList = storedData['RedirectList'];

        for (var index in redirectList) {
            $("#allPair").prepend("<li>" + index + " -> " + redirectList[index] + "</li>");
        }
    });
    
});