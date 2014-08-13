
function changePopup(pageName) {
    chrome.browserAction.setPopup({
        popup: pageName
    });
}