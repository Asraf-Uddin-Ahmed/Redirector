

function goToMainPopup(hideObj) {
    REDIRECTOR.SoundManager.playWhistle();
    hideObj.hide(300, function () {
        $("#mainPopup").show(300);
    });
}


$(function () {
    
    REDIRECTOR.ChromeStorage.reloadRedirectObject();

    var objAddNewForm = $("#addNewForm");
    var objShowAllForm = $("#showAllForm");

    objAddNewForm.validationEngine({ promptPosition: "centerRight", scroll: false });
    objShowAllForm.validationEngine({ promptPosition: "topRight", scroll: false });


    $("#addNewDivAddUrl").click(function () {
        var isValid = objAddNewForm.validationEngine('validate');
        if (isValid == false)
            return;

        var blockWord = $("#blockWord").val();
        var redirectUrl = $("#redirectUrl").val();
        $("#blockWord").val("");
        $("#redirectUrl").val("https://");

        var objRedirect = REDIRECTOR.ChromeStorage.pushUrlByWord(blockWord, redirectUrl);
        REDIRECTOR.ChromeStorage.saveRedirectObject(objRedirect);
        goToMainPopup($("#addNewDiv"));
    });

    $("#addNewDivCancel").click(function () {
        goToMainPopup($("#addNewDiv"));
    });



    $("#showAllTableBody").on("click", ".delete_row_show_all", function () {
        REDIRECTOR.SoundManager.playDeleteSound();

        var tr = $(this).closest('tr');
        tr.css("background-color", "#FF3700");
        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
    
    $("#showAllDivSave").click(function () {
        var isValid = objShowAllForm.validationEngine('validate');
        if (isValid == false)
            return;

        var redirectListNew = {};
        $("#showAllTableBody").find('tr').each(function () {
            var cols = $(this).find('input[type=text]');
            redirectListNew[cols[0].value] = cols[1].value;
            //console.log(cols[0].value + " -> " + cols[1].value);
        });
        REDIRECTOR.ChromeStorage.saveRedirectObject(redirectListNew);
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
        var objRedirect = REDIRECTOR.ChromeStorage.getRedirectObject();
        $.each(objRedirect, function (index, value) {
            $("#showAllTableBody").append("<tr>" +
                                    "<td><input type='text' value='" + index + "'  class='validate[required]' /></td>" +
                                    "<td><input type='text' value='" + value + "'  class='validate[required, custom[url]]'/></td>" +
                                    "<td><input type='button' value='delete' class='delete_row_show_all' /></td>" +
                                "</tr>");
        });

        $("#mainPopup").hide(300, function () {
            $("#showAllDiv").show(300);
        });
    });

    $("#addNew, #showAll").click(function () {
        REDIRECTOR.SoundManager.playClick();
    });
});