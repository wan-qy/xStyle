// is mobile or not
const isAndroid = navigator.userAgent.indexOf('Android') > 0;
const isIOS = navigator.userAgent.indexOf('iOS') > 0;
const isMobile = (isAndroid || isIOS);

//export
const XSTYLE_DUMP_FILE_EXT = ".json";
const XSTYLE_DUMP_FILE_NAME = "xstyle-{Y}-{m}-{d}-{H}-{i}-{s}" + XSTYLE_DUMP_FILE_EXT;
const XSTYLE_DEFAULT_SAVE_NAME = "xstyle-export" + XSTYLE_DUMP_FILE_EXT;

var isFirefox = false;
var FIREFOX_VERSION = 0;
if (/Firefox\/(\d+)\.(\d+)/.test(navigator.userAgent)) {
	isFirefox = true;
	FIREFOX_VERSION = navigator.userAgent.match(/Firefox\/(\d+)\.(\d+)/);
	FIREFOX_VERSION = parseFloat(FIREFOX_VERSION[1] + '.' + FIREFOX_VERSION[2]);
}

var isChrome = false;
var CHROME_VERSION = 0;
if (/Chrome\/(\d+)\.(\d+)/.test(navigator.userAgent)) {
	isChrome = true;
	CHROME_VERSION = navigator.userAgent.match(/Chrome\/(\d+)\.(\d+)/);
	CHROME_VERSION = parseFloat(CHROME_VERSION[1] + '.' + CHROME_VERSION[2]);
}

// make querySelectorAll enumeration code readable
["forEach", "some", "indexOf", "map"].forEach(function(method) {
	if (typeof(NodeList.prototype[method]) === 'undefined') {
		NodeList.prototype[method]= Array.prototype[method];
	}
});

//date format
function DateFormat(f, d) {
	if (typeof(d) === 'undefined') {
		d = new Date();
	}
	f = f.replace(/\{Y\}/g, d.getFullYear());
	f = f.replace(/\{m\}/g, d.getMonth() + 1);
	f = f.replace(/\{d\}/g, d.getDate());
	f = f.replace(/\{H\}/g, d.getHours());
	f = f.replace(/\{i\}/g, d.getMinutes());
	f = f.replace(/\{s\}/g, d.getSeconds());
	return f;
}

//get url params
function getParams() {
	var params = {};
	var urlParts = location.href.split("?", 2);
	if (urlParts.length == 1) {
		return params;
	}
	urlParts[1].split("&").forEach(function(keyValue) {
		var splitKeyValue = keyValue.split("=", 2);
		params[decodeURIComponent(splitKeyValue[0])] = decodeURIComponent(splitKeyValue[1]);
	});
	return params;
}

// Whether the URL can be styled or not
function canStyle(url) {
	// only http, https, file, extension allowed
	if (url.indexOf("http") !== 0 && url.indexOf("file") !== 0 && url.indexOf("moz-extension") !== 0 && url.indexOf("chrome-extension") !== 0 && url.indexOf("ftp") !== 0) {
		return false;
	}
	// other extensions can't be styled
	if ((url.indexOf("moz-extension") == 0 || url.indexOf("chrome-extension") == 0) && url.indexOf(browser.extension.getURL("")) != 0) {
		return false;
	}
	return true;
}

// Get Active Tab
function getActiveTab(callback) {
	browser.tabs.query({currentWindow: true, active: true}).then(function(tabs) {
		callback(tabs[0]);
	});
}
