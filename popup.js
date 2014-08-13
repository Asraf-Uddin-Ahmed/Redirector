
var storedData;


$(function () {

    var redirectList;
    chrome.storage.sync.get(function (items) {
        storedData = items;
        redirectList = storedData['RedirectList'];

        for (var index in redirectList) {
            $("#showAllTableBody").append("<tr>" +
                                    "<td><input type='text' value='" + index + "' /></td>" +
                                    "<td><input type='text' value='" + redirectList[index] + "' /></td>" +
                                    "<td><input type='button' value='delete' /></td>" +
                                "</tr>");
        }
    });

    $("#addNew").click(function () {
        $("#mainPopup").hide(300, function () {
            $("#addNewDiv").show(300);
        });
    });

    $("#showAll").click(function () {
        $("#mainPopup").hide(300, function () {
            $("#showAllDiv").show(300);
        });
    });
});