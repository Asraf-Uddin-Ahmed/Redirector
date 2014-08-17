
var redirectList;

function reloadRedirectList() {
    chrome.storage.sync.get(function (items) {
        redirectList = items['RedirectList'];
    });
}

function saveRedirectList(redirectList) {
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'RedirectList': redirectList }, function () {
        // Notify that we saved.
        //alert('Redirect list saved');
        reloadRedirectList();
    });
}

function goToMainPopup(hideObj) {
    playWhistle();
    hideObj.hide(300, function () {
        $("#mainPopup").show(300);
    });
}

$(function () {

    reloadRedirectList();

    $("#addNewDivAddUrl").click(function () {
        var blockWord = $("#blockWord").val();
        var redirectUrl = $("#redirectUrl").val();
        redirectList[blockWord] = redirectUrl;
        saveRedirectList(redirectList);
        goToMainPopup($("#addNewDiv"));
    });

    $("#addNewDivCancel").click(function () {
        goToMainPopup($("#addNewDiv"));
    });



    $("#showAllTableBody").on("click", ".delete_row_show_all", function () {
        var tr = $(this).closest('tr');
        tr.css("background-color", "#FF3700");
        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
    
    $("#showAllDivSave").click(function () {
        var redirectListNew = {};
        $("#showAllTableBody").find('tr').each(function () {
            var cols = $(this).find('input[type=text]');
            redirectListNew[cols[0].value] = cols[1].value;
            //console.log(cols[0].value + " -> " + cols[1].value);
        });
        saveRedirectList(redirectListNew);
        goToMainPopup($("#showAllDiv"));
    });

    $("#showAllDivCancel").click(function () {
        goToMainPopup($("#showAllDiv"));
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

    $("#addNew, #showAll").click(function () {
        playClick();
    });
});