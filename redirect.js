
var redirectList = [];
redirectList["asraf"] = "https://www.facebook.com/";
redirectList["uddin"] = "https://www.google.com/";
redirectList["ahmed"] = "https://www.bing.com/";

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
