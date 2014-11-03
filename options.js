
REDIRECTOR.chromeStorage = function () {
    var objToReturn = {};

    /*
    PRIVATE
    */
    var objRedirect = {};
    
    var reloadRedirectObject = function () {
        chrome.storage.sync.get(function (items) {
            var obj = items['RedirectList'];
            objRedirect = jQuery.extend({}, obj);
        });
    }

    var saveRedirectObject = function (obj) {
        chrome.storage.sync.set({ 'RedirectList': obj }, function () {
            reloadRedirectObject();
        });
    }

    var pushUrlByWord = function (word, url) {
        objRedirect[word] = url;
        return objRedirect;
    }

    var getRedirectObject = function () {
        return objRedirect;
    }

    /*PUBLIC*/
    objToReturn.reloadRedirectObject = reloadRedirectObject;
    objToReturn.saveRedirectObject = saveRedirectObject;
    objToReturn.pushUrlByWord = pushUrlByWord;
    objToReturn.getRedirectObject = getRedirectObject;

    return objToReturn;
}();


$(function () {

    REDIRECTOR.chromeStorage.reloadRedirectObject();

    $("#addNewDivAddUrl").click(function () {
        var blockWord = $("#blockWord").val();
        var redirectUrl = $("#redirectUrl").val();
        $("#blockWord").val("");
        $("#redirectUrl").val("");

        var objRedirect = REDIRECTOR.chromeStorage.pushUrlByWord(blockWord, redirectUrl);
        REDIRECTOR.chromeStorage.saveRedirectObject(objRedirect);
        goToMainPopup($("#addNewDiv"));
    });

    $("#addNewDivCancel").click(function () {
        goToMainPopup($("#addNewDiv"));
    });



    $("#showAllTableBody").on("click", ".delete_row_show_all", function () {
        playDeleteSound();

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
        REDIRECTOR.chromeStorage.saveRedirectObject(redirectListNew);
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
        var objRedirect = REDIRECTOR.chromeStorage.getRedirectObject();
        $.each(objRedirect, function (index, value) {
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