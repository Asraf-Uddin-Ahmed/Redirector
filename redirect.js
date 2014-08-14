
var redirectList = {};
var blockPatterns = [];

var redirectCallback = function (details) {
    var url = details.url;
    for (var index in redirectList) {
        if (url.indexOf(index) != -1) {
            url = redirectList[index];
        }
    }
    return { redirectUrl: url };
}

function addListenerOnBeforeRequest() {
    chrome.webRequest.onBeforeRequest.addListener(
        redirectCallback,
        { urls: blockPatterns },
        ["blocking"]
    );
}

function removeListenerOnBeforeRequest() {
    chrome.webRequest.onBeforeRequest.removeListener(redirectCallback);
}

function addListenerOnBeforeRequestFromStorage() {
    chrome.storage.sync.get(function (items) {
        redirectList = items['RedirectList'];
        blockPatterns = [];
        for (var index in redirectList) {
            blockPatterns.push("*://*/*" + index + "*");
        }
        console.log(blockPatterns);
        addListenerOnBeforeRequest();
    });
}


addListenerOnBeforeRequestFromStorage();


chrome.storage.onChanged.addListener(function (changes, namespace) {
    removeListenerOnBeforeRequest();
    addListenerOnBeforeRequestFromStorage();
});
