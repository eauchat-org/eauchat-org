// JavaScript Document

/* -var 1- */
//tools to create with jquery
var div = "<div/>",
	link = "<a/>",
	span = "<span/>",
	img = "<img>",
	table = "table", // not setted
	tr = "tr", // not setted
	td = "td", // not setted
	input = "input"; // not setted

/* -var 4- */			//-----> COLOR PALETTES <-----//

var hoveringColor = "pink";
var hoveringColorTRANSPARENT = "rgba(255,192,203,0.5)";



//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------EVERYTHING----------------------------------------------------------------------------------------


//----------------------------------------------------------------acting on divs------------------------------------------------------------------------------------
function Append (type, appendTO, appendID, appendCLASS, href_or_source, width_or_padding, height_or_spacing) {
	if (type == div) {
		$(appendTO).append('<div id="'+ appendID +'"></div>');
	}
	else if (type == img) {
		$(appendTO).append('<img src="'+ href_or_source +'" width="'+ width_or_padding +'" height="'+ height +'" id="'+ appendID +'">');
	}
	else if (type == link) {
		$(appendTO).append('<a href="'+ href +'" id="'+ appendID +'"></a>');
	}
	else if (type == span) {
		$(appendTO).append('<span id="'+ appendID +'"></span>');
	}
	else if (type == table) {
		if (width_or_padding == undefined) width_or_padding = 0;
		if (height_or_spacing == undefined) height_or_spacing = 0;
		$(appendTO).append('<table id="'+ appendID +'" cellpadding="'+ height_or_spacing +'" cellspacing="'+ width_or_padding +'"></table>');
	}
	else if (type == td) {
		$(appendTO).append('<td id="'+ appendID +'"></td>');
	}
	else if (type == tr) {
		$(appendTO).append('<tr id="'+ appendID +'"></tr>');
	}
	else if (type == input) {
		$(appendTO).append('<input id="'+ appendID +'"></input>');
	};

	if (appendCLASS != undefined) $(appendID).attr("class", appendCLASS);
};

function DELETEdiv (divTOdelete, children) {
	if (children == "children") $(divTOdelete).children().remove()
	else $(divTOdelete).remove();
};


//-------------------------------------------------------------acting on strings------------------------------------------------------------------------------------
function deletePX (string) { return +string.replace(/px/, ""); };

function deleteFirstType (string) { return string.replace(/^./, ""); };

function numberWithUnit_to_number (string) { return +string.replace(/\D+$/, "") };

//------------------------------------------------------------generating numbers------------------------------------------------------------------------------------
function randomNumber (min, max, integer) { 
	if (integer=="integer") return Math.floor(Math.random() * (max - min + 1)) + min;
	else return Math.random() * (max - min) + min;
};

// random color
function randomNumberColor () { return randomNumber(0,255, "integer") };
function randomColor (transparency) {
	if (transparency!=true) { transparency =1 }
	else { transparency = randomNumber (0,1) };
	return "rgba("+randomNumberColor()+","+randomNumberColor()+","+randomNumberColor()+","+transparency+")"
}

//-------------------------------------------------------------remaping arrays-------------------------------------------------------------------------------------
function remapValuesLinearily (originArray, targetDomain, originDomain) { // input originDomain only if you want it not to match originArray min and max values

	// ---- makes it work if originArray is an object
	if ( typeof originArray == "object" && $.isArray(originArray) == false ) {
		var originArrayArray = [];
		var originArrayArrayKeys = [];
		for (key in originArray) {
			originArrayArrayKeys.push(key);
			originArrayArray.push(originArray[key]);
		};
		originArray = originArrayArray;
	};
	// ---- makes it work if originArray is an object END
	
	// min and max of origin array // or chosen min and max
	if (originDomain == undefined || originDomain[0] == undefined) var originArray_min = Math.min.apply(Math, originArray)
	else var originArray_min = originDomain[0];
	if (originDomain == undefined || originDomain[1] == undefined) var originArray_max = Math.max.apply(Math, originArray)
	else var originArray_max = originDomain[1];

	// return if array contain not numbers values
	if (isNaN(originArray_min) || isNaN(originArray_max)) return console.log("your array contains inputs that aren't numbers || array : ["+ originArray +"]");
	
	// find the linear function to apply to the origin array
	var y = (originArray_max*targetDomain[0] - originArray_min*targetDomain[1]) / (originArray_max - originArray_min);
	if (originArray_max != 0) var x = (targetDomain[1]-y)/originArray_max
	else if (originArray_min != 0) var x = (targetDomain[0]-y)/originArray_min
	else console.log("both min an max values are null");

	// apply function to array and return output array
	var newArray = [];
	originArray.forEach(function(d,i){
		newArray.push( +d*x + y );
	});

	// ---- makes it work if originArray is an object
	if ( typeof originArrayArray != "undefined" ) {
		newArrayObject = {};
		originArrayArrayKeys.forEach(function(d,i){
			newArrayObject[d] = newArray[i];
		});
		newArray = newArrayObject;
	};
	// ---- makes it work if originArray is an object END

	return newArray;
};

function setUpDomainOfValues_forAnObject (inputDatasObject, arrayOfAskedIDs, targetDomain, originDomain) { // input originDomain only if you want it not to match originArray min and max values
	// create an array of the asked values
	var targetsValues = [];
	var targetsIds = [];
	arrayOfAskedIDs.forEach(function(d,i){
		targetsValues.push(+inputDatasObject[d]);
		targetsIds.push(d);
	});
	// remap values of the array
	var remapedValues = remapValuesLinearily (targetsValues, targetDomain, originDomain);
	// create an object from the array
	var remapedValuesObject = {};
	targetsIds.forEach(function(d,i){
		remapedValuesObject[d] = remapedValues[i];
	});
	// return the created object
	return remapedValuesObject;
};
	
//---------------------------------------------------------------opening links-------------------------------------------------------------------------------------
function openLink (d, newOrSame_window) {
	var LINKTO = $(d).attr("href");
	if (typeof newOrSame_window == "undefined" || newOrSame_window == "same" ) window.location.href = LINKTO
	else if (newOrSame_window == "new") window.open(LINKTO);
};




//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------CSV TREATMENT-----------------------------------------------------------------------------------------





function object1DTOobject2D (input_object1D, withOrWithoutID) {
	var output_object2D = {};
	input_object1D.forEach(function(d,i){
		var sub_object = {};
		jQuery.extend(sub_object, d);
		output_object2D[d[URUs_datas_firstKey]] = sub_object;
		if (withOrWithoutID == "without") delete output_object2D[d[URUs_datas_firstKey]].URU_ID;
	});
	return output_object2D
};





function object1DTOarray (input_object1D, withOrWithoutID) {
	var output_array = [];
	
	//add first an array of all keys
	var keys_array = [];
	for (key in input_object1D[0]) { keys_array.push(key); };
	output_array.push(keys_array);

	//transform each object of the input to an array and introduce it in output array
	input_object1D.forEach(function(d,i){
		var sub_array = [];
		for (key in d) {
			sub_array.push(d[key]);
		};
		output_array.push(sub_array);
	});

	return output_array
};





function getDatas (linkToCSV, chooseKindOfDataYouWant) {
	
	var ceciESTmonCSV = ajax(linkToCSV).responseText;
	
	//transforming data using jquery.csv library
	//defining variables for different ways to display data
	var CSV_Array = $.csv.toArrays(ceciESTmonCSV);
	var CSV_Object_Without_Ids = $.csv.toObjects(ceciESTmonCSV);
	var CSV_Object1D = $.csv.toObjects(ceciESTmonCSV);

	//generating a 2 levels object : first level generated using first column, second using first line
	var entry_id,
		CSV_Object2D = {},
		CSV_Object2DwithID = {};
		
		CSV_Object_Without_Ids.forEach(function(d,i){
			entry_id = d[CSV_Array[0][0]]; //the code will only work when the cell that defines labels is called URU_ID <----------Used to be this way, now should work for all		
			CSV_Object2D[entry_id] = d;
		});	
	
	//delete CSV_Object2D IDs and generate CSV_Object2DwithID
	//also take away Id for CSV_Object_Without_Ids (because subobjects are linked)
	for (key in CSV_Object2D) {
		CSV_Object2DwithID[key] = {};
		jQuery.extend(CSV_Object2DwithID[key], CSV_Object2D[key]);
		delete CSV_Object2D[key][CSV_Array[0][0]];
	};

	//return the chosen kind of data
	if (chooseKindOfDataYouWant=="array") { return CSV_Array; }
	else if (chooseKindOfDataYouWant=="object1D") { return CSV_Object1D; }
	else if (chooseKindOfDataYouWant=="object2D") { return CSV_Object2D; }
	else if (chooseKindOfDataYouWant=="object2DwithIDs") { return CSV_Object2DwithID; }
	else if (chooseKindOfDataYouWant=="objectWithoutIds") { return CSV_Object_Without_Ids; }
	else if (chooseKindOfDataYouWant=="brutData") { return ceciESTmonCSV; }
	else if (chooseKindOfDataYouWant=="arrayWithoutIds") {
			var CSV_ArrayWithoutIds = $.csv.toArrays(ceciESTmonCSV);
			//take away Id for CSV_ArrayWithoutIds
			CSV_ArrayWithoutIds.forEach(function(d){d.splice(0,1);});
			return CSV_ArrayWithoutIds;};

};





function flipDatas (dataToFlip, chooseKindOfDataYouWant) { // input must be an array
	// Four outputs : IDs, array, object1D, object2D
	var URU_IDs = [];
	var URU_flipedData_array = [];
	var URU_flipedData_object1D = [];
	var URU_flipedData_object2D = {};
	var SVGs = [];
		for (i=0; i<dataToFlip[0].length-1; i++) { URU_flipedData_array.push([]); };
		for (i=0; i<dataToFlip[0].length-1; i++) { URU_flipedData_object1D.push({}); };
		for (i=0; i<dataToFlip[0].length-1; i++) { URU_flipedData_object2D[dataToFlip[0][i+1]]={}; };
		dataToFlip[0].forEach(function(d,i) { SVGs[i]=d; }); SVGs.splice(0,1); //create a list of IDs for object2D
		dataToFlip.forEach(function(d,i){
			URU_IDs.push(d[0]);
			d.splice(0,1);
			dataToFlip[i].forEach(function(dd,ii){
				URU_flipedData_array[ii].push(d[ii]); //Flip array to array
				URU_flipedData_object1D[ii][URU_IDs[i]] = d[ii]; //Flip array to object1D
				URU_flipedData_object2D[SVGs[ii]][URU_IDs[i]] = d[ii]; //Flip array to object2D
			});
		});
	if (chooseKindOfDataYouWant=="array") { return URU_flipedData_array; }
	else if (chooseKindOfDataYouWant=="object1D") { return URU_flipedData_object1D; }
	else if (chooseKindOfDataYouWant=="object2D") { return URU_flipedData_object2D; }
	else if (chooseKindOfDataYouWant=="IDs") { return URU_IDs; }
};





function getURUs_datas (datasThatYouWant_title) {

//log(URUs_datas);
	var datasThatYouWant = [];
	var datasThatYouWant_ID;
	URUs_datas.forEach(function(d,i) { if (d[URUs_datas_firstKey] == "_"+ datasThatYouWant_title) datasThatYouWant_ID = i; });
	
	if (typeof URUs_datas[datasThatYouWant_ID+1] != "undefined")
		for (i=datasThatYouWant_ID+1; i<URUs_datas.length && URUs_datas[i][URUs_datas_firstKey].match(/^_/)==null; i++) {
			datasThatYouWant.push(URUs_datas[i])
		}
	else (console.log("the data that you asked doesn't exist"));
//log(datasThatYouWant_title);
	return datasThatYouWant;

};





//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------SVG---------------------------------------------------------------------------------------



	d3seeOrigin_cross_id = 0;
var Xorigin = d3appendOriginCross = function (TARGET, crossSIZE, strokeWidth, strokeColor) {
	// define default variables
	if (crossSIZE == undefined) crossSIZE = 200;
	if (strokeWidth == undefined) strokeWidth = 1;
	if (strokeColor == undefined) strokeColor = ["#0f0", "#f0f"]
	else if (strokeColor == "same") strokeColor = ["#0f0", "#0f0"];

	if (typeof TARGET == "object" && typeof TARGET.node == "function") var targetID = TARGET.node().parentNode
	else if (typeof TARGET == "object" && typeof TARGET.node != "function") var targetID = d3.select("#"+TARGET[0].id).node().parentNode
	else var targetID = d3.select(TARGET).node().parentNode;

	// append first line
	d3.select(targetID)
	.append("line")
	.attr("id", "d3seeOrigin_cross"+ d3seeOrigin_cross_id + "_A")
	.attr("class", "d3seeOrigin_cross"+ d3seeOrigin_cross_id)
	.attr("x1", -window.innerWidth/crossSIZE)
	.attr("x2", window.innerWidth/crossSIZE)
	.attr("y1", -window.innerWidth/crossSIZE)
	.attr("y2", window.innerWidth/crossSIZE)
	.style({"stroke": strokeColor[0] , 'stroke-width': strokeWidth,})
	;

	// append second line
	d3.select(targetID)
	.append("line")
	.attr("id", "d3seeOrigin_cross"+ d3seeOrigin_cross_id + "_B")
	.attr("class", "d3seeOrigin_cross"+ d3seeOrigin_cross_id)
	.attr("x1", -window.innerWidth/crossSIZE)
	.attr("x2", window.innerWidth/crossSIZE)
	.attr("y1", window.innerWidth/crossSIZE)
	.attr("y2", -window.innerWidth/crossSIZE)
	.style({"stroke": strokeColor[1], 'stroke-width': strokeWidth,})
	;

	d3seeOrigin_cross_id = d3seeOrigin_cross_id + 1;
	
	return "d3seeOrigin_cross"+ (d3seeOrigin_cross_id - 1);
};


/* 					INVISIBLE matching fucking regexp  --------------------------/// /// ///------------------ 
			var zou = "invisible";
			console.log( zou.match(/(a)?!b/g) );
*/


/*
function reverse(s) {
  return s.split('').reverse().join('');
}
zou = reverse(zou);
			console.log(  );
		if (zou.match(/elbisiv(?!ni)/g)) console.log(zou);

zou = reverse(zou);
		console.log(zou);

var newString = "Fall ball bill balll cm am llama in  ino invisible invisible visible"

newStringa = newString.match(/in(?!visible)/g);
//newString = newString.match(/(in)?=visible/g);
console.log(newStringa);
*/

function appendAnySVG ([SVGname_inFinder, SVGname, customPathToSVG], array_of_askedLayers, numberByLine_OR_arrayOfHeightAndWidth, appendTo, linkTo, withURUtext) {

	//-------------- set default variables if lack of defined ones
	if (typeof SVGname != "undefined" && SVGname == "same") var sameSVG = true;
	if (typeof SVGname == "undefined" || SVGname == "same") SVGname = SVGname_inFinder;

	var pathToSVG = "datas/";
		if (typeof customPathToSVG == "undefined") customPathToSVG = pathToSVG; 
	if (typeof appendTo == "undefined") {appendTo = "body";};
	//-------------- set default variables if lack of defined ones END

	//-------------- load SVG in head
	//load the SVG if it doesn't exist already (place it in HTML's head)
	if (typeof $("#load_"+SVGname_inFinder)[0] == "undefined") {
		$(div, { id: "load_"+SVGname_inFinder }).appendTo("head").css({"display":"none"});
		$("#load_"+SVGname_inFinder).append(ajax( customPathToSVG + SVGname_inFinder + ".svg" ).responseText);
	};
	//define loaded SVGs height and width
	var loadedSVG = $("#load_"+SVGname_inFinder).children();
	var width = loadedSVG.attr("width");
	var height = loadedSVG.attr("height");
	if (width.match(/\D/) || height.match(/\D/)) { console.log("YOU MUST SET YOU SVG SIZE IN PIXELS, NOT IN : height : \"" + height.match(/\D+/) +"\" and width: \""+ width.match(/\D+/) +"\"") };
	//-------------- load SVG in head END
	
	//-------------- deal with case : if logo is asked multiple times
	if (typeof $("#"+SVGname)[0] != "undefined" && SVGname==SVGname_inFinder && typeof sameSVG == "undefined") {console.log("Do you intent to load more than one logo in same id ? ___:___ SVGname = "+SVGname)};
	//-------------- deal with case : if logo is asked multiple times END

	//-------------- append OR prepend a div to contain the SVG
	if (appendTo.match("PREPEND")) {
		appendTo = appendTo.replace("PREPEND", "")
		$(div, { id: SVGname}).prependTo(appendTo);
	}
	else $(div, { id: SVGname}).appendTo(appendTo);
	//-------------- append OR prepend a div to contain the SVG END





	//-------------- append SVG for each asked layer
	array_of_askedLayers.forEach(function(d,i){
		//append a div for each layer
		$(div, { id: SVGname+'_div_'+d, class: SVGname, "data-key": d  }).appendTo('#'+SVGname);
		
		//append SVG for each layer (in link if required)
		if (typeof linkTo == "undefined" || linkTo == false) {
			$('#'+SVGname+'_div_'+d).html("<svg id="+SVGname+"_svg_"+d+" class="+SVGname+"_SVG></svg>");
		} 
		else {
			if (typeof linkTo == "object") {
				if (linkTo[0]=="constant") HREF = linkTo[1]
				else HREF = linkTo[i]
			}
			else if (linkTo.match("html")) HREF = linkTo+d
			else if (linkTo.match("javascript")) HREF = linkTo+"\'"+d+"\')"
			else console.log("problem with SVG linkTo");
			
			$(link, { id: SVGname+'_link_'+d, href: HREF, }).appendTo('#'+SVGname+'_div_'+d);
			$('#'+SVGname+'_link_'+d).html("<svg id="+SVGname+"_svg_"+d+" class="+SVGname+"_SVG></svg>");
		};
		
		//define SVG's size
		$('#'+SVGname+'_svg_'+d).attr({"width":width, "height": height});
	
		//clone wanted SVG layer into just created SVG, and turn on display
		var layerToClone = $('#load_'+SVGname_inFinder+' g[inkscape\\:label='+d+']');			
			layerToClone.clone().appendTo('#'+SVGname+'_svg_'+d).attr('id',SVGname+"_g_"+d);
			$("#"+SVGname+"_g_"+d).css({"display":"inline-block"});

		//append title of layer if asked
		if (typeof withURUtext != "undefined") {
			// define if require to append or prepend
			if (typeof withURUtext !="boolean" && withURUtext.match("PREPEND")) { APPEND = "prepend" }
			else { APPEND = "append" };
			

		//append or prepend name depending of what is asked + set it to be visible or invisible
//		if (withURUtext.match(/(?<!in)visible/)) console.log(withURUtext);
		if (typeof withURUtext !="boolean" && ( (withURUtext.match(/visible/) && withURUtext.match(/invisible/)==null) || withURUtext.match("true") ))
			$('#'+SVGname+'_div_'+d)[APPEND]("<p>"+d+"</p>" )
		else if (typeof withURUtext !="boolean" && ( withURUtext.match(/invisible/) || withURUtext.match(/hidden/)) )
			$('#'+SVGname+'_div_'+d)[APPEND]("<p>"+d+"</p>" ).css("color", "rgba(0,0,0,0)")
		else console.log("there is a problem with \"withURUtext\" it might be a boolean or some wrong value__:__"+withURUtext);

		// alphabet layout
		$(".unR_logos").css("margin", window.theWidth_I_want/100);
		// text of alphabet layout
		$(".unR_logos").children().css({
			"font-size": window.theWidth_I_want/100,
			"margin-top": window.theWidth_I_want/300,
			"margin-bottom": window.theWidth_I_want/300,
		});

		};
	});
	//-------------- append SVG for each asked layer END





	//-------------- Resize SVG
	array_of_askedLayers.forEach(function(d,i){
		var LOGOchaquesSVG = $('#'+SVGname+'_svg_'+d);
		if (typeof numberByLine_OR_arrayOfHeightAndWidth == "object") {
			var ratioHeight = numberByLine_OR_arrayOfHeightAndWidth[0]/width			
			var ratioWidth = numberByLine_OR_arrayOfHeightAndWidth[1]/width
		}
		else var ratioWidth = ratioHeight = 1*window.theWidth_I_want/(width*+numberByLine_OR_arrayOfHeightAndWidth);

		LOGOchaquesSVG.attr({"height":height*ratioHeight, "width":width*ratioWidth});
		LOGOchaquesSVG.children().attr({transform: "scale("+ ratioWidth +","+ ratioHeight +")"});
	});
	//-------------- Resize SVG END

};

function resizeSVG_proportionnaly (targetSVG, isReferenceWidthOrHeight, newWidthOrHeight, origin, previousWidth, previousHeight) {
/*
	var width = $(targetSVG).children().attr("width")
	var height = $(targetSVG).children().attr("height")
log(width);
*/
	if (typeof previousWidth == "undefined") var width = $(targetSVG).children().attr("width")
	else width = previousWidth;
	if (typeof previousHeight == "undefined") var height = $(targetSVG).children().attr("height")
	else height = previousHeight;
	
	if (isReferenceWidthOrHeight == "height")		var ratio = newWidthOrHeight / height
	else if (isReferenceWidthOrHeight == "width")	var ratio = newWidthOrHeight / width;

	var ratioHeight = ratioWidth = sx = sy = ratio;
//	var cx = width;
	$(targetSVG).attr({"height": height*ratioHeight, "width": width*ratioWidth});
//	$(targetSVG).children().attr({"height": $(targetSVG).attr("height"), "width": $(targetSVG).attr("width")});
//	$(targetSVG).children().attr({transform: "scale("+ ratioWidth +","+ ratioHeight +")"});
	if (origin == "topLeft") {
		var cx = 0;
		var cy = 0;
	}
	else if (origin == "topRight") {
		var cx = width;
		var cy = 0;
	}
	else if (origin == "bottomLeft") {
		var cx = 0;
		var cy = height;	
	}
	else if (origin == "bottomRight") {
		var cx = width;
		var cy = height;	
	};

	$(targetSVG).children().attr({transform: "matrix("+ sx +", 0, 0, "+ sy +", "+ 0 +", "+ 0 +")"});
//	$(targetSVG).children().attr({transform: "matrix("+ sx +", 0, 0, "+ sy +", "+ (cx-sx*cx) +", "+ (cy-sy*cy) +")"});

/*
	$(targetSVG).children().attr({
		transformOrigin: "100% 100%",
		transform: "scale("+ ratioWidth +","+ ratioHeight +")"
	});
*/

	$(targetSVG).children().attr({"height": $(targetSVG).attr("height"), "width": $(targetSVG).attr("width")});
};



//-------------------------- Change colors of logo and fit white to background-color
	var replacementColor_hover = {};
function changeLogoColor (targetSVG, colorToChange, replacementColor, hoverColor, colorAfterHover) {
	//choose targets and select them
	var targets = ["fill", "stroke"];
		targets.forEach(function(d,i){
			var elements = $(targetSVG + " path").filter(function() { return $(this).css(d) == colorToChange; });
			
			//replace colors if asked
			if (replacementColor != false)	{ elements.css(d, replacementColor) }
			else							{ replacementColor = colorToChange; };

			//set colorAfterHover
			if (colorAfterHover != false)	{ replacementColor_hover[colorToChange+d] = colorAfterHover; }
			else							{ replacementColor_hover[colorToChange+d] = replacementColor; };

			//-------------- hover colorize in constant color, and colorize in new color on mouseout
			if (hoverColor != false) {
				//set color to replace by after hovering
				//replacementColor_hover[colorToChange+d]=colorAfterHover;
				elements.hover(
					function() {
						$( this ).css("transition", "none");
						$( this ).css(d, "pink");
					},
					function() {
						$( this ).css("transition", ".8s linear");
						$( this ).css(d, replacementColor_hover[colorToChange+d]);
					}
				);
			//-------------- hover colorize in constant color, and colorize in new color on mouseout END
			};

		});
};





function colorizeThumbnails (SVGname, hover, onlyHover) {//--> Colorize thumbnails corresponding to development state
	
	if (onlyHover!="onlyHover") {
	//colorize svg in correspondance with development state
		for (key in URUs_datas_object2D__withoutID.Etat) {
			$('#'+SVGname+'_svg_'+key).css("background-color", Etat_colorRange[URUs_datas_object2D__withoutID.Etat[key]])
		}
	};

	//colorize on hover
	if (hover == true || hover == "hover") {		
		$(document).ready(function(){
			$("."+SVGname+"_SVG").hover(
				function() {
					window.hoveredElementColor = $( this ).css("background-color");//--- Problem if mouse come back quickly on a thumbnail
					$( this ).css({
						"background-color": hoveringColor,
//						"transition": ".5s linear"
						});
				},
				function() {
					$( this ).css("background-color", hoveredElementColor);
				}
			);
		});
	};

};	//-----------------------------------------------------------> Colorize thumbnails corresponding to development state END




function FUNNYcolorsBarLogoLink (idItWasAppenedTo) {
	if (book_or_computer == "book") changeLogoColor (idItWasAppenedTo, "rgb(255, 255, 255)", function(){ return randomColor() }, hoveringColor, function(){ return randomColor() }); // white : only hover, afterHover: grey
	if (book_or_computer == "computer") 	changeLogoColor (idItWasAppenedTo, "rgb(255, 255, 255)", false, hoveringColor, function(){ return randomColor() }); // white : only hover, afterHover: grey
	changeLogoColor (idItWasAppenedTo, "rgb(0, 255, 255)", $('#ALL').css("background-color"), false, false); // white to background-color, no hover
	changeLogoColor (idItWasAppenedTo, "rgb(0, 0, 255)", Etat_colorRange.Réalisé, hoveringColor, false); // blue to cyan, hover, afterHover: same color
	changeLogoColor (idItWasAppenedTo, "rgb(85, 0, 0)", "black", "pink", false);
};
























function setBODY_height (SCALING) {
	if (SCALING == undefined) SCALING = 1;
	logoBAR_height = logoBAR_height * SCALING;
//	log(logoBAR_height);
//	logoBAR_height = deletePX( $("#logo_BAR").css("height") ) * SCALING + deletePX( $("#logo_BAR").css("padding-bottom") );
	$("#BODY").css("height", window.theHeight_I_want - logoBAR_height +"px");
};















//----------------------------------------- Append logo/tools
function appendLOGOsBar (appendTO, linkTo, withArrows) {
	//define appendTO if not
	if (typeof appendTO == "undefined") appendTO = "#logo_BAR";
	
	var SCALE = URUs_IDs_list_array.length+2;

	//-------------------------- Load alphabet
	appendAnySVG (["unR_logos", "LOGOSbar"], URUs_IDs_list_array, SCALE, appendTO, linkTo, "PREPENDvisible");
	appendAnySVG (["unR_logos", "LOGOSbarB"], ["LOGO"], SCALE, "PREPEND#LOGOSbar", ["constant", "HTML_Accueil.html"], "PREPENDinvisible");
	appendAnySVG (["unR_logos", "LOGOSbarE"], ["LOGO"], SCALE, "#LOGOSbar", ["constant", "HTML_Accueil.html"], "PREPENDinvisible");
	
	//set logosBAR layout
	["#LOGOSbarB", ".LOGOSbar", "#LOGOSbarE"].forEach(function(d){
		$(d).css({
			"display": "inline-block",
			"font-size": window.theWidth_I_want/170 +"px",
			"font-family": '"Lato"',
			"color": "black",
		});
	});

	$(appendTO).css({
		"text-align": "center",
		"margin": "auto",
		"background-color": "#ccc",
		"width": window.theWidth_I_want,
		"padding-bottom": window.theWidth_I_want/200,
	});

	//colorize alphabet (and deal with hovering)
	colorizeThumbnails ("LOGOSbar", "hover");
	colorizeThumbnails ("LOGOSbarB", "hover", "onlyHover");
	colorizeThumbnails ("LOGOSbarE", "hover", "onlyHover");
	/*
	[".LOGOSbarE_SVG", ".LOGOSbarB_SVG"].forEach(function(d,i){
//		$(d).css("background-color", hoveringColor)
		$(d).hover(
			function() {
				$( this ).css("background-color", hoveringColor);
			},
			function() {
				$( this ).css("background-color", "none");
			}
		);
	});
*/
	//-------------------------- Load alphabet END
	
	//append next and previous arrows
	if (withArrows = "with arrows") {
		appendNEXTandPREVIOUS(appendTO);
	};
	
	//to be deleted if possible (because it should be variabe on resize)
	window.logoBAR_height = deletePX( $(appendTO).css("height") ) + deletePX( $(appendTO).css("padding-bottom") ); //10 must be the padding or something else causing miscalculation
};
//----------------------------------------- Append logo/tools on top END



function appendNEXTandPREVIOUS (appendTO) {
	appendTOheightPX = $(appendTO).css("height");
	
	//append div, link and arrows
	$(appendTO).prepend('<div class="previous"><a href= "javascript:navigateTo_pickedURU (\'previous\')"> ← </a></div>');
	$(appendTO).append('<div class="next"><a href="javascript:navigateTo_pickedURU (\'next\')"> → </a></div>');

	//set NEXTandPREVIOUS layout
	[".previous", ".next"].forEach(function(d){
		$(d).css({
		});

		$(d).children().css({
			"font-family": '"LatoLight"',
			"font-size": window.theWidth_I_want/80 +"px",
			"color": "black",
			"position":"absolute",
			"bottom": window.theWidth_I_want/200,
			"height": appendTOheightPX,
//			"vertical-align": "middle",
		});
		
		$(d).children().hover(
			function() {
				$( this ).css("background-color", hoveringColorTRANSPARENT);
			},
			function() {
				$( this ).css("background-color", "none");
			}
		);
	});
	
	$(".previous").children().css("left", "0%");
	$(".next").children().css("right", "0%");
};





function colorizeCurrent (target, selectorName) {
	$(target).children().css("background-color", "none");
	$(target+"_div_"+selectorName).css("background-color", hoveringColor);
};






























function inventoryFolder (pathToListOfElements) {
	//--------------------------> Get list of names of photos from text file
	var DAT = getDatas(pathToListOfElements, "array");
	var concernedURU = 0;
	var images_list_Object = {};
	var tableIn_images_list_Object = [];
	
	//------------treat the "DAT" input text document (list of files) and output the paths of all files
	DAT.forEach(function(d,wi){
		if (d[0].match(/(\.\/.*:$)/)){
			var folderName = d[0].match(/(\.\/.*:$)/)[0].replace("./", "").replace(":", "");
			for (i=wi+1; i<DAT.length && DAT[i][0].match(/.\//)==null; i=i+1) {
				if(DAT[i][0]!=""){
					DAT[i][0] = /*DAT[concernedURU][0]*/folderName +"/"+DAT[i][0];
					DAT[i].push("noDelete");
					tableIn_images_list_Object.push(DAT[i][0]) //get images list as object
					images_list_Object[folderName] = tableIn_images_list_Object; //get images list as object
				}
			};
			tableIn_images_list_Object = []; //get images list as object
			concernedURU = concernedURU + 1;
		};
	});
	DAT.forEach(function(d,i){
		if (d[1]=="noDelete") {DAT[i]=d[0];}
		else {delete DAT[i];}
	});

	DAT = $.grep(DAT,function(n){ return(n); });
	//------------treat the "DAT" input text document (list of files) and output the paths of all files END
	return images_list_Object;
	//--------------------------> Get list of names of photos from text file END
};



















//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------SIZE OF PAGES-------------------------------------------------------------------------------------

// choose size of page
function dimensionsOFpages (chosen_or_fitWithScreen, with_or_without_LINE) {
	if (chosen_or_fitWithScreen == undefined) {
		fixed_or_notFixed__windowWidth ();	
	}
	else {		
		fixed_or_notFixed__windowWidth (chosen_or_fitWithScreen[0], chosen_or_fitWithScreen[1]);
		setDimensions (with_or_without_LINE);
//		window.onresize = RESIZING;
	};
	
	return chosen_or_fitWithScreen;
};

function fixed_or_notFixed__windowWidth (fixed_or_unfixed_width, fixed_or_unfixed_height) {
	if (fixed_or_unfixed_width == undefined || fixed_or_unfixed_width == "unfixed" || fixed_or_unfixed_width == "default") {
		window.theWidth_I_want = window.innerWidth;
		window.theHeight_I_want = window.innerHeight;
	}
	else {
		window.theWidth_I_want = fixed_or_unfixed_width;
		window.theHeight_I_want = fixed_or_unfixed_height;
	}
};

// set chosen sizes
function setDimensions (with_or_without_LINE) {
	//set page size
	$("#ALL").css({
		"height": window.theHeight_I_want +"px",
		"width": window.theWidth_I_want +"px",
	});

	$("#ALL").css({
		"background-color": "white",
	/*------ CENTER PAGE ------*/
		"position": "absolute",
		"top": 0,
		"bottom": 0,
		"left": 0,
		"right": 0,
		
		"margin": "auto",
	/*---- CENTER PAGE END ----*/
	});

	if (with_or_without_LINE == "withLine" || with_or_without_LINE == "with") {
		//append ligne témoin milieu entre deux pages
		$("#ALL").append('<div id="ligne"></div>');
		$("#ligne").css({
	//		"text-align": "center",
			"left": window.theWidth_I_want/2-1 +"px",
			"top": 0,
			"width": "2px",
			"height": window.theHeight_I_want + "px",
			"position": "absolute",
			"background-color": "black",
			"z-index": 1000,
		});
	};
};

// set page's dimensions
function resizePage (whichKind) {
	if (whichKind == "computer") return dimensionsOFpages ()
	else if (whichKind == "book") return dimensionsOFpages ([CHOSEN_windowWidth, CHOSEN_windowHeight], withORwithoutLINE) //here delete variables if you want to fit screen ^^^
	else console.log("the chosen kind of layout is invalid : choose either \"book\" or \"computer\"");
};


/*
function RESIZING (chosenDimensionS) {
	dimensionsOFpages (chosenDimensionS);
};
*/










//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------APPEND THUMBNAIL NEAR MOUSE------------------------------------------------------------------------------

	// make every call of this function unique
	var appendImageNearMouseDIVidNumber = 0;
function appendImageNearMouse (id_of_hovered_element, [whichKindOfElement, [ImageOrDivWidth, ImageOrDivHeight], sourceImageOrDiv], LAYOUT, appendWhere) { // be carefull about layout setting up, maybe it would be better to do it outside the function
	
	// append div to support images near mouse if it doesn't exists already and set it's basic layout
	if ( $("#info_targetsGraph")[0] == undefined ) {
		$("#ALL").append('<div id="info_targetsGraph"></div>');
		$("#info_targetsGraph").css({
			"color": LAYOUT.textColor,
			"text-align": LAYOUT.textAlign,
			"font-size": LAYOUT.fontSize,
			"z-index": 1000,
		});
	};
	//$('#info_targetsGraph').hide();

	var appendImageNearMouseDIVid = "info_targetsGraph_" + appendImageNearMouseDIVidNumber + "_";
	$(document).ready(function(){
		$(id_of_hovered_element).on('mouseenter', function(evt){
			var THISidwithoutHash = appendImageNearMouseDIVid + this.id;
			var THISid = "#" + appendImageNearMouseDIVid + this.id;

			// append a div to contain small graph if not already done
			if ($(THISid)[0] == undefined) {
				$("#info_targetsGraph").append('<div id="'+ THISidwithoutHash +'"></div>');
				$(THISid).css("background-color", LAYOUT.backgroundColor)
				
				// append the kind of data that is aked
				if (whichKindOfElement == "img") $(THISid).append('<img src="'+ sourceImageOrDiv +'" width="'+ ImageOrDivWidth +'" height="'+ ImageOrDivHeight +'">')
				else if (whichKindOfElement == "graphByTarget") appendGraphByTarget ( THISid, $(this)[0].id, [ImageOrDivWidth, ImageOrDivHeight] );
				else if (whichKindOfElement == "polar") {
					appendPolarGraph ( THISid, $(this).text(), ImageOrDivWidth );
				};
				
				$(THISid).append('<div>'+ $(this).text() +'</div>');

				// ---------- set position of the div
				// set absolute before asking width otherwise value is wrong
				$(THISid).css("position", "absolute");
	
				if (appendWhere == "appendNearMouse") {
					$(THISid).css({
						"left": evt.pageX - 30 - deletePX( $(THISid).css("width") ),
						"top": evt.pageY - 15 - deletePX( $(THISid).css("height") ),
					});
				}
				else {
					for (key in appendWhere) {
						$(THISid).css(key, appendWhere[key])
					};
				};
				// ---------- set position of the div END
				
				// ---------- append image for polars
				if (whichKindOfElement == "polar") {
					$(THISid).append('<img id="'+ $(this)[0].id +'_illustrationImage" src="'+ (sourceImageOrDiv + $(this).text().match(/URU_.*/)[0] +".jpg") +'" height="'+ deletePX( $(THISid).css("height") )*0.8 +'">')

						$("#"+ $(this)[0].id +"_illustrationImage").css({
							position: "absolute",
							top: 0,
							right: function(){ return $(this).parent().css("width") },
						});

/*
//info_targetsGraph_1_LOGOSbar_div_URU_A9
					// delay setting position otherwise it doesn't work (image hasn't time to be loaded and give it's width)
					setTimeout(function() {
			//			$("#"+ $(this)[0].id +"_illustrationImage").css( "left", 0 - deletePX( $("#"+ $(this)[0].id +"_illustrationImage").css("width") ) );
						$("#"+ $(this)[0].id +"_illustrationImage").css({
							position: "absolute",
							top: 0,
							left: 0 - deletePX( $("#"+ $(this)[0].id +"_illustrationImage").css("width") ),
						});
					}, 100);
*/
				};
				// ---------- append image for polars END
			};



			// show div
			$(THISid).show();
			// hide on mouse leave
			$(this).on('mouseleave', function(){
				$(THISid).hide();
			});
	    });
	});
	
	appendImageNearMouseDIVidNumber = appendImageNearMouseDIVidNumber + 1;
};



//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------UNUSED---------------------------------------------------------------------------------------





//----------------------------------------------------> Append logo
function appendOneLogo (askedURU) {
//	if (typeof idURUasked != "undefined") {asked=idURUasked};
	
	//load and flip CSV table that contain instructions for calling SVG
	var SVGs_loadingProperties = getDatas ("datas/SVG_LogosURUs/_SVG_loadingProperties.csv", "object2DwithIDs")
	
	//modify a few instructions to call and then append logo
	var LOGO_unR_fiche = SVGs_loadingProperties["unR_LOGOS_fiche"];
		LOGO_unR_fiche.constantAskedLayer = askedURU;
		LOGO_unR_fiche.numberByLine_OR_arrayOfHeightAndWidth = 20;
		appendSVG (LOGO_unR_fiche);
	
	colorizeThumbnails (LOGO_unR_fiche);
};
//----------------------------------------------------> Append logo END


















//default values for size (to change if you want in HTMLs or specific JSs)
var CHOSEN_windowWidth = CHOSEN_windowHeight = undefined;
fixed_or_notFixed__windowWidth (CHOSEN_windowWidth);




