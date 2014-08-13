
var redirectList = {
    "asraf": "https://www.facebook.com/",
    "uddin": "https://www.google.com/",
    "ahmed": "https://www.bing.com/"
};

// Save it using the Chrome extension storage API.
chrome.storage.sync.set({ 'RedirectList': redirectList }, function () {
    // Notify that we saved.
    alert('Redirect list saved');
});


var blockPatterns = [];
for (var index in redirectList) {
    blockPatterns.push("*://*/*" + index + "*");
}

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
	    console.log(details);

	    var url = details.url;
	    for (var index in redirectList) {
	        if (url.indexOf(index) != -1) {
	            url = redirectList[index];
	        }
	    }

	    return { redirectUrl: url };
	},
	{ urls: blockPatterns },
	["blocking"]
);
