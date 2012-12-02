/*jslint bitwise: true, eqeq: false, sloppy: true, white: true, browser: true, devel: true, indent: 2 */
/*globals phh, jQuery, window, location, setTimeout, clearTimeout, decodeURI, console, google, FB */
/*
Copyright 2005 & 2012 by Paul H Howells
Licensed under the MIT License
*/
/* style
	SYMBOLIC_CONSTANTS
	variable_names
	$jquery_objects
	functionNames
	methodNames
	ConstructorClassNames
	css-class-names

	i, j, k loop iterators
	o private object
	r return object
	p public object
*/

(function ($) {
	var unit_generator;
	
	unit_generator = {
	  column_width : 20,
	  gutter : 20,
	  number_of_columns : 12,
	  init : function () {
    	var the = this;
    	
    	
    	the.run();
    	
    },
  	run : function () {
    	var 
    	  the = this,
    	  css;
    	
    	the.unit_width = the.column_width + the.gutter;
    	the.padding_left = Math.ceil(the.gutter / 2);
    	the.padding_right = Math.floor(the.gutter / 2);
    	
    	css = '';
    	
      css += ".u-inner {padding-left: " + the.padding_left + "px; padding-right: " + the.padding_right + "px;} <br />";
      
    	for (i = 1; i <= the.number_of_columns; i++) {		
				i_total = i * the.unit_width;
				css += ".u-" + i +" {width: " + i_total + "px;}  <br />";
			}
    	
    	
    	
    	
    	
    	$('#css-output').html(css);
  	}
	};
	
	$(function () { // ready
	  unit_generator.init();
	}); // eo:ready
	
}(jQuery));