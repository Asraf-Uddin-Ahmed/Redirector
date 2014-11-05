
REDIRECTOR.ChromeStorage = function () {
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

