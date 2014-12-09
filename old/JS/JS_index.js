//everything is done twice with localhost, this trick delete everything at start so that if things are done more than one time, only the last time count
$("#ALL").empty();

//---------------------------------------------------------------------TITLE----------------------------------------------------------------------------------------
HTML_title = "Eauchat - HOME";
//---------------------------------------------------------------------//|\\----------------------------------------------------------------------------------------

//-----------------------------------------------------------------"BACKGROUND"-------------------------------------------------------------------------------------
// append the "background cats" (which in fact aren't a background because they are interactive)

// choose the SVG layers that will be displayed
var layersToImport = ["HEADER", "FOOTER"];

// import SVG
appendAnySVG(["Eauchat_HOME", "eauchats", "datas/"], layersToImport, 1, "#ALL");//, linkTo, withURUtext);

// change SVG colors
layersToImport.forEach(function(d,i){
	changeLogoColor ("#eauchats_div_"+ d, "rgb(0, 255, 255)", "#08f", hoveringColor, "yellow");
	changeLogoColor ("#eauchats_div_"+ d, "rgb(255, 255, 255)", "#cde", false);
});

// background base layout
$("#eauchats").children().css("position", "fixed");
$("#eauchats_div_HEADER").css("top", 0);
//---------------------------------------------------------------"BACKGROUND" END-----------------------------------------------------------------------------------

//------------------------------------------------------------------LOGOS PREFS-------------------------------------------------------------------------------------
// here choose which logo you want, the title and eplenation of the service it represents, and the link to the service

var logos = {
	Travaux : {
		name : "Travaux",
		url : "error.html",
		commentText : "Eauchat is a work in progress, take a look at the progresses and to do.",
		showIn : "homePageCorner",
	},
	Settings : {
		name : "Settings",
		url : "error.html",
		commentText : "",
		showIn : "homePageCorner",
	},
////////////////////////////////////////////////////////////////////////////////////////////////////
	Mails : {
		name : "Emails",
		url : "error.html",
		commentText : "Create or have a look at your emails.",
		showIn : "homePage",
	},
	Telephone : {
		name : "Call",
		url : "error.html",
		commentText : "Call someone via eau_chat.",
		showIn : "homePage",
	},
	Chat : {
		name : "Chat",
		url : "error.html",
		commentText : "",
		showIn : "homePage",
	},
	Cloud : {
		name : "OwnCloud",
		url : "error.html",
		commentText : "Create or consult your own cloud.",
		showIn : "homePage",
	},
	Medias : {
		name : "Media sharing",
		url : "error.html",
		commentText : "Share videos, pictures and other stuff.",
		showIn : "homePage",
	},
	Pad : {
		name : "Pads",
		url : "error.html",
		commentText : "Groupwork on pads.",
		showIn : "homePage",
	},
////////////////////////////////////////////////////////////////////////////////////////////////////
	Hosted : {
		name : "Hosted sites",
		url : "error.html",
		commentText : "Have a look at other websites hosted by eauchat.",
	},
};
//----------------------------------------------------------------LOGOS DISPLAYING----------------------------------------------------------------------------------

var logosToImport_coinHaut = [],
	logosToImport_coinhaut_hrefs = [],
	logosToImport = [],
	logosToImport_hrefs = [];

// dispach asked logos in different type of displays (main, top right corner (or maybe also in the future in submenus))
	for (key in logos) {
		if (logos[key].showIn == "homePageCorner") {
			logosToImport_coinHaut.push (key);
			logosToImport_coinhaut_hrefs.push(logos[key].url);
		}
		else if (logos[key].showIn == "homePage") {
			logosToImport.push (key);
			logosToImport_hrefs.push(logos[key].url);
		};
	};


//----------------------------> Append logos

// append top right corner logos (and change it's colors)
	$("#ALL").append('<div/ id="logos_topRight">');
	appendAnySVG(["Services_LOGOS", "eauchats_services_settings", "datas/"], logosToImport_coinHaut, [window.innerWidth/15, window.innerWidth/15], "#logos_topRight");//, linkTo, withURUtext);
	logosToImport_coinHaut.forEach(function(d,i){
		changeLogoColor ("#eauchats_services_settings_div_"+ d, "rgb(0, 255, 255)", "#08f", hoveringColor, "yellow");
		changeLogoColor ("#eauchats_services_settings_div_"+ d, "rgb(255, 255, 255)", "#cde", false);
	});

// append main logos (and change it's colors)
	$("#ALL").append('<div/ id="logos">');
	logosLayout ();
	var LOGOS_size = $("#logos").width() / (logosToImport.length + 1);
	
	appendAnySVG(["Services_LOGOS", "eauchats_services_logos", "datas/"], logosToImport, [LOGOS_size, LOGOS_size], "#logos", logosToImport_hrefs);//, withURUtext);
	logosToImport.forEach(function(d,i){
		changeLogoColor ("#eauchats_services_logos_div_"+ d, "rgb(0, 255, 255)", "#08f", hoveringColor, "#08f");
		changeLogoColor ("#eauchats_services_logos_div_"+ d, "rgb(255, 255, 255)", "#cde", false);
	});

// logos layout
	function logosLayout () {
		$(".eauchats_services_logos, .eauchats_services_settings").css({
			display: "inline-block",
		});
		$(".eauchats_services_logos").css({
			border: "0.1px ridge #fff",
			margin: 5,
			paddingTop: window.innerHeight/5,
		});
		$("#eauchats_services_settings").css({
			textAlign: "right",
		});
	
		$("#logos").css({
			marginLeft:		window.innerWidth*(2.3/10),
			marginRight:	window.innerWidth*(1.7/10),
			width:			window.innerWidth*(6/10),
			position: 		"fixed",
			top:			-10,
		});
	};

//----------------------------> Append logos END


//----------------------------> Append and show explications text when hover logos
	$("#logos").append('<div/ id="logoTitle">');
	$("#logos").append('<div/ id="logoComment">');

	// show the right title and info for the right logo
	$("#eauchats_services_logos, #eauchats_services_settings").children().children().hover(function(d){
		$("#logoTitle").text(function(){
			return logos[$(d.currentTarget).parent().attr("data-key")].name;
		});
		$("#logoComment").text(function(){
			return logos[$(d.currentTarget).parent().attr("data-key")].commentText;
		});
	}, function(){
		$("#logoTitle").text("");
		$("#logoComment").text("");
	});

	// same than upper for Hosted websites mushroom
	$("#eauchats #a8598").hover(function(d){
		$(this).attr("xlink:href", logos.Hosted.url);
		
		$("#logoTitle").text(function(){
			return logos.Hosted.name;
		});
		$("#logoComment").text(function(){
			return logos.Hosted.commentText;
		});
	}, function(){
		$("#logoTitle").text("");
		$("#logoComment").text("");
	});

	// ------------------ title and comment style
	$("#logoTitle, #logoComment").css({
		marginLeft: "2%",
		marginRight: "2%",
		width: "96%",
	});

	$("#logoTitle").css({
		fontSize: "20px",
		textTransform: "uppercase",
	});

	$("#logoComment").css({
		fontSize: "15px",
	});
	
//----------------------------> Show explications text when hover logos END


//--------------------------------------------------------------LOGOS DISPLAYING END--------------------------------------------------------------------------------

//-------------------------------------------------------------------RESIZING---------------------------------------------------------------------------------------
// handle resizing of page and other layout stuffs

var resizables = {
	FOOTER: {
		widthOrHeight: "width",
		transformOrigin: "bottomLeft",
	},
	HEADER: {
		widthOrHeight: "width",
		transformOrigin: "topLeft",		
	},
};

for (key in resizables) {
	resizables[key].orginalWidth = $("#eauchats_div_"+ key).children().attr("width");
	resizables[key].orginalHeight = $("#eauchats_div_"+ key).children().attr("height");
};


function resizing () {
	$("#eauchats_div_FOOTER").css({
		top: window.innerHeight - $("#eauchats_div_FOOTER").children().attr("height"),
	});

	for (key in resizables) {
		resizeSVG_proportionnaly ("#eauchats_div_"+ key, resizables[key].widthOrHeight, window.innerWidth, resizables[key].transformOrigin, resizables[key].orginalWidth, resizables[key].orginalHeight);
	};
	$("#eauchats_div_HEADER").children().attr("height", 2000);

	$("#eauchats_div_ALL").css({
		right: 0,
	});
	
	logosLayout ();
};

window.onload = resizing;
window.onresize = resizing;
//-----------------------------------------------------------------RESIZING END-------------------------------------------------------------------------------------

//--------------------------------------------------------------KEYBOARD SHORTCUTS----------------------------------------------------------------------------------
//KeyboardJS.on("shift + a", function() { fuckingAnimations (); });
