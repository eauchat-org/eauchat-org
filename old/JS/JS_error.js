//everything is done twice with localhost, this trick delete everything at start so that if things are done more than one time, only the last time count
$("#ALL").empty();

//---------------------------------------------------------------------TITLE----------------------------------------------------------------------------------------
HTML_title = "Eauchat - UNDER CONSTRUCTION";

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

//-------------------------------------------------------------------KEYBOARD SHORTCUTS-------------------------------------------------------------------//
//KeyboardJS.on("shift + a", function() { fuckingAnimations (); });
