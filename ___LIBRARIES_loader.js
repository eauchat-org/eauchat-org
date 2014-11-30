// JavaScript Document

var log = $$$ = console.log.bind(console);

// --------------------- Test browser type
var BROWSERis = {
//  ff: window.globalStorage,
  ff: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
  ie: document.all && !window.opera,
  ie6: !window.XMLHttpRequest,
  ie7: document.all && window.XMLHttpRequest && !XDomainRequest && !window.opera,
  ie8: document.documentMode==8,
  opera: Boolean(window.opera),
  chrome: Boolean(window.chrome),
  safari: window.getComputedStyle && !window.globalStorage && !window.opera
}

if (BROWSERis.ff) nameOfBrowserYouUse = "Firefox"
else if (BROWSERis.chrome) nameOfBrowserYouUse = "Chrome"
else if (BROWSERis.opera) nameOfBrowserYouUse = "Opera"
else if (BROWSERis.safari) nameOfBrowserYouUse = "Safari"
else if (BROWSERis.ie) nameOfBrowserYouUse = "Internet Explorer"
else nameOfBrowserYouUse = "???";
// --------------------- Test browser type END


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------PICKUP WHAT YOU WANT TO LOAD AND IT'S PATH-----------------------------------------------------------------------

// --------------------- Paths to loaded scripts
var pathsToScripts = {
	global: "",
	libraries: "___LIBRARIES/",
	JS_folder: "JS/",
	CSS_folder: "CSS/",
}
// --------------------- Paths to loaded scripts END

// --------------------- Source libraries
var defaultLibraries = {
	_loadFonts:				{path: "libraries",		type: "stylesheet",		url: "_fonts_loader.css"},

//	d3: 					{path: "libraries",		type: "javascript",		url: "d3/d3.min.js"},
	jqueryCSV: 				{path: "libraries",		type: "javascript",		url: "jquery.csv-0.71.min.js"},
//	colorbox: 				{path: "libraries",		type: "javascript",		url: "jquery.colorbox/jquery.colorbox-min.js"},
//	colorbox_CSS: 			{path: "libraries",		type: "stylesheet",		url: "jquery.colorbox/colorbox.css"},
	keboardJS: 				{path: "libraries",		type: "javascript",		url: "KeyboardJS-master/keyboard.js"},
//	taffyDB: 				{path: "libraries",		type: "javascript",		url: "taffy-min.js"},
//	pouchDB: 				{path: "libraries",		type: "javascript",		url: "pouchdb-2.2.3.min.js"},
//	paperJS: 				{path: "libraries",		type: "javascript",		url: "paper/paper-full.min.js"},
//	scrolltable: 			{path: "libraries",		type: "javascript",		url: "scrolltable.js"},
//	tableSorter: 			{path: "libraries",		type: "javascript",		url: "jquery.tablesorter.min.js"},
	browserDetect: 			{path: "libraries",		type: "javascript",		url: "jquery-browser/jquery.browser.min.js"},

/*
	jqueryUI: 				{path: "libraries",		type: "javascript",		url: "jquery-ui-1.11.0/jquery-ui.min.js"},
	jqueryUI_CSS: 			{path: "libraries",		type: "stylesheet",		url: "jquery-ui-1.11.0/jquery-ui.min.css"},
	jqueryUIstructure_CSS: 	{path: "libraries",		type: "stylesheet",		url: "jquery-ui-1.11.0/jquery-ui.structure.min.css"},
	jqueryUItheme_CSS: 		{path: "libraries",		type: "stylesheet",		url: "jquery-ui-1.11.0/jquery-ui.theme.min.css"},
*/

//	jqueryqtip: 			{path: "libraries",		type: "javascript",		url: "jquery.qtip/full/jquery.qtip.min.js"},
//	jqueryqtip_CSS: 		{path: "libraries",		type: "stylesheet",		url: "jquery.qtip/full/jquery.qtip.min.css"},


	_myOwnLibrary:	 		{path: "JS_folder",		type: "javascript",		url: "_myOwnLibrary.js"},	
	_gleLayout:				{path: "CSS_folder",	type: "stylesheet",		url: "CSS__LAYOUTforALL.css"},
};
// --------------------- Source libraries END

// --------------------- Current HTML's JS and CSS
//find names
	var currentDocumentName = HTMLname ();
	if (currentDocumentName.match(/^HTML/) == null) currentDocumentName = "HTML_"+currentDocumentName; //in case name of html document isn't starting by HTML
	var this_HTML_CSS	= currentDocumentName.replace("HTML", "CSS").replace("html", "css");
	var this_HTML_JS	= currentDocumentName.replace("HTML", "JS").replace("html", "js");

//loadInfos
var current_JSandCSS = {
	currentJS: 				{path: "JS_folder",		type: "javascript",		url: this_HTML_JS},
	currentCSS: 			{path: "CSS_folder",	type: "stylesheet",		url: this_HTML_CSS},
};
// --------------------- Current HTML's JS and CSS END

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------LOADING FUNCTION----------------------------------------------------------------------------------

// load scripts
function loadScripts (scriptsToLoad, ifPaperScript_canvaName) {

	if (typeof scriptsToLoad == "undefined") scriptsToLoad = defaultLibraries;

	// script, stylesheet or paperscript HTML definition :
	var script_or_stylesheet_object = {
		javascript: "script",
		stylesheet: "style",
		paperscript: "script",
		javascript_type: 'type="text/javascript"',
		stylesheet_type : 'rel="stylesheet"',
		paperscript_type: 'type="text/paperscript"',	
	};

	// function do load script
	function loadScript (scriptName, pathToScript, script_or_stylesheet, ifPaperScript_canvaName) {
		//ajax text of the script
		var textOfScript = ajax (pathToScript).responseText;
		
		//define type of element created
		_div = script_or_stylesheet_object[script_or_stylesheet];
		_divType = script_or_stylesheet_object[script_or_stylesheet +"_type"];		

		//append script to HTML
		$("#loaded_"+ _div +"s").append("<"+ _div +" "+ _divType +" id=\""+ scriptName +"\">"+ textOfScript +"</"+ _div +">");

		//in case it is a paper script set required attributes
		if (script_or_stylesheet == "paperscript") $("#"+ scriptName).attr("canvas", ifPaperScript_canvaName);
		
		//log error if unavailable
		if (textOfScript == undefined) console.log("You asked to load : ***"+ scriptName +"*** (path: "+ pathToScript +") but it failed (the document must be unavailable)");
	};


	//create a "loaded_scripts" div if the HTML doesn't contain one already
	if (typeof $("#loaded_scripts")[0] == "undefined")	$("<div/>", { id: "loaded_scripts" }).appendTo("body");
	if (typeof $("#loaded_styles")[0] == "undefined")	$("<div/>", { id: "loaded_styles" }).appendTo("head");

	//append each asked script
	for (key in scriptsToLoad) {
		// deal with custom paths
		if ( scriptsToLoad[key].path == "custom" ) 	PATH = scriptsToLoad[key].customPath
		else										PATH = pathsToScripts[ scriptsToLoad[key].path ] + scriptsToLoad[key].url;
		// load scripts
		loadScript (key, PATH, scriptsToLoad[key].type, ifPaperScript_canvaName);
	};

};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------REQUIRED FUNCTIONS----------------------------------------------------------------------------------

// ajax
function ajax (dataToGet) {
	return $.ajax({
	        type: 'GET',
	        url: dataToGet,
	        async: false,
	        success: function(content){
	            data = content;
	        },
	        error: function(ERROR){
	            if (ERROR.readyState == 0) console.log("CAN'T FIND THE FILE YOU ASKED AT THIS ADDRESS : " + dataToGet)
	        },
	    })
};

// get HTML name
function HTMLname () {
	return window.location.pathname.match(/[^/]*$/)[0];
};

// upper folder
var upperFolderURL = uFu = function (howUpDoYouWantToGo, currentURL) {
	if (currentURL == undefined) currentURL = window.location.pathname; //href	
	currentURL = currentURL.split("/"); // change url into array
	for (i=-1; i<howUpDoYouWantToGo; i++) {
		currentURL.pop(); // loop as much time as needed to get to the asked parent folder 
	};
	currentURL = currentURL.join("/"); // change it back to string
	currentURL = decodeURIComponent(currentURL + "/"); // ad the ending folder slash

	return currentURL;
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------END-----------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------