"use strict";

$(document).ready(function() {
  var appsContainer = $('div#apps'),
      apps = appsContainer.find('ul.apps').children(),
      descriptionsContainer = $('#descriptions'),
      appAnchor;

  // Handler when mouse comes in
  var hoverIn = function() {
    var app = $(this).attr('data-app'),
        description = descriptionsContainer.find('div[data-description=' + app + ']');
    description.addClass('active');
  };

  // Handler when mouse goes out
  var hoverOut = function() {
    var app = $(this).attr('data-app'),
        description = descriptionsContainer.find('div[data-description=' + app + ']');
    description.removeClass('active');
  };

  for (var i = 0; i < apps.length; i++) {
    // Get the app name
    appAnchor = $(apps[i]).find('a');
    // Attach handlers
    appAnchor.hover(hoverIn, hoverOut);
  }
});
