
var storedData;


$(function () {

    var redirectList;
    chrome.storage.sync.get(function (items) {
        storedData = items;
        redirectList = storedData['RedirectList'];
    });

    $("#showAllTableBody").on("click", ".delete_row_show_all", function () {
        var tr = $(this).closest('tr');
        tr.css("background-color", "#FF3700");
        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
    
    $("#showAllDivSave").click(function () {
        $("#showAllTableBody").find('tr').each(function () {
            var cols = $(this).find('input[type=text]');
            console.log(cols[0].value + " -> " + cols[1].value);
        });
    });

    $("#showAllDivCancel").click(function () {
        $("#showAllDiv").hide(300, function () {
            $("#mainPopup").show(300);
        });
    });



    $("#addNew").click(function () {
        $("#mainPopup").hide(300, function () {
            $("#addNewDiv").show(300);
        });
    });

    $("#showAll").click(function () {

        $("#showAllTableBody").empty();
        $.each(redirectList, function (index, value) {
            $("#showAllTableBody").append("<tr>" +
                                    "<td><input type='text' value='" + index + "' /></td>" +
                                    "<td><input type='text' value='" + value + "' /></td>" +
                                    "<td><input type='button' value='delete' class='delete_row_show_all' /></td>" +
                                "</tr>");
        });

        $("#mainPopup").hide(300, function () {
            $("#showAllDiv").show(300);
        });
    });
});