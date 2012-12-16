/*jslint bitwise: true, eqeq: false, sloppy: true, white: true, browser: true, devel: true, indent: 2 */
/*globals phh, jQuery, window, document, location, setTimeout, clearTimeout, decodeURI, console, google, FB */
/*
Copyright 2005 & 2012 Paul H Howells
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
    fields : {
      column_width : {
        val : 20
      },
      gutter : {
        val : 20
      },
      number_of_columns : {
        val : 12
      },
      show_breakpoints : {
        checked : 'checked'
      }
    },
    test : {
      isNumber : function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    },
    process : {
      html_escape : function (str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      },
      be_even : function (n) {
        if (n % 2) {
          n += 1;
        }
        return n;
      }
    },
    breakpoints : {
      visible : true
    },
    font : {
      visible : true,
      scaffold : {
				core : [10, 11, 12, 13, 14, 15, 16, 18],
				overrides : [10, 11, 12, 13, 14, 15, 16, 18, 20, 21, 22, 24, 25, 28, 32, 36]
			},
			core : [
			 {size : 14, line_height : 20}
			]
    },
    init : function () {
      var
        the = this,
        ui = document.ui, // the UI form
        field_name;

      // if the form fields have values then update variables
      // else if empty fill the fields with default values
      for (field_name in the.fields) {
        if (the.fields.hasOwnProperty(field_name)) {

          if (ui.hasOwnProperty(field_name)) {

            switch (ui[field_name].type) {
              case 'text':

                // check if the form field has the value attribute
                if (ui[field_name].hasOwnProperty('value')) {
                  if (ui[field_name].value) {
                    the.fields[field_name].val = ui[field_name].value;
                  } else {
                    ui[field_name].value = the.fields[field_name].val;
                  }
                }
                break;
              case 'checkbox':

                // check if the form field has the checked attribute
                if (ui[field_name].hasOwnProperty('checked')) {
                  if (ui[field_name].checked) {
                    the.fields[field_name].checked = ui[field_name].checked;
                  } else {
                    ui[field_name].checked = the.fields[field_name].checked;
                  }
                }

                // $('input[name=foo]').attr('checked', true);
                // $('.myCheckbox').prop('checked', true); jquery 1.6

                // $('.myCheckbox').attr('checked','checked');
                // $('.myCheckbox').removeAttr('checked');
                // var checked = $(this).attr('checked') ? true : false;

                break;
            }

          }
        }
      }


      // attach handlers to form elements
      $('.digits').
        keyup(function (el) {
          var val = parseInt(this.value, 10);
          the.fields[this.name].val = (the.test.isNumber(val)) ? val : 0;
          the.run();
        }).
        change(function () {
          var val = parseInt(this.value, 10);
          the.fields[this.name].val = (the.test.isNumber(val)) ? val : 0;
          the.run();
        }).
        blur(function () {
        });

      $('#show-breakpoints').
        change(function () {
          the.breakpoints.visible = this.checked;
          the.run();
        });

      // first run
      the.run();

      //console.log(ui.show_breakpoints);
    },
    run : function () {
      var
        the = this,
        i,
        i_total,
        i_width,
        css,
        tab,
        // breakpoint vars
        i_o,
        i_break,
        i_unit_type,
        i_brk_array,
        brk,
        breakpoints,
        i_px,
        i_em,
        i_core;
          
      the.unit_width = the.fields.column_width.val + the.fields.gutter.val;
      the.padding_left = Math.ceil(the.fields.gutter.val / 2);
      the.padding_right = Math.floor(the.fields.gutter.val / 2);
      tab = '&#9;';
      
      css = '';
      css += "/*<br />";
      css += " *  Unit CSS system<br />";
      css += " *<br />";
      css += " *<br />";
      css += " *<br />";
      css += " */<br />";
      css += "<br />";

      // define unit wrapper
      css += ".units,<br />";
      css += ".u-wrapper {<br />";
      css += "&#9;/* wraps a set of unit columns  */<br />";
      css += "&#9;overflow:hidden; _overflow:visible; _zoom:1;<br />";
      css += "} <br />";

      // define unit wrapper width
      i_width = the.fields.number_of_columns.val * the.unit_width;
      css += ".units-" + the.fields.number_of_columns.val + ",<br />";
      css += ".u-wrapper-" + the.fields.number_of_columns.val + " {<br />";
      css += "&#9;width: " + i_width + "px<br />";
      css += "&#9;min-width: " + i_width + "px<br />";
      css += "} <br />";

      // optional: add padding to the wrapper so that side gutters match the column gutters
      css += ".units-matched-page-gutters,<br />";
      css += ".u-wrapper-matched-page-gutters {<br />";
      css += "&#9;padding-left: " + the.padding_left + "px;<br />";
      css += "&#9;padding-right: " + the.padding_right + "px;<br />";
      css += "} <br />";

      // define unit inner
      css += ".u-inner {<br />";
      css += "&#9;padding-left: " + the.padding_left + "px;<br />";
      css += "&#9;padding-right: " + the.padding_right + "px;<br />";
      css += "} <br />";

      // define unit css
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        css += ".u-" + i;
        if (i !== the.fields.number_of_columns.val) {
        css += ", ";
        }
      }
      css += ' {<br />';
      css += "&#9;float: left;<br />";
      css += "&#9;min-height: 2px;<br />";
      css += "&#9;position: relative;<br />";
      css += "&#9;overflow:hidden; _overflow:visible; _zoom:1;<br />";
      css += '}<br />';

      // define unit widths
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        i_total = i * the.unit_width;
        css += ".u-" + i +" {width: " + i_total + "px;}  <br />";
      }

      css += ' <br />';

      // pre
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        i_width = (the.unit_width) * i;
        //i_total = i_width; // + the.padding_left;
        css += ".pre-" + i + " {padding-left:" + i_width + "px;} <br />";
      }

      // post
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        i_width = (the.unit_width) * i;
        //i_total = i_width; // + the.padding_right;
        css += ".post-" + i + " {padding-right:" + i_width + "px;} <br />";
      }

      // push
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        i_width = (the.unit_width) * i;
        css += ".push-" + i + " {margin-left:" + i_width + "px;} <br />";
      }

      // pull
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        i_width = (the.unit_width) * i;
        css += ".pull-" + i + " {margin-left:-" + i_width + "px;} <br />";
      }

      css += '<br />';

      // breakpoints
      if(the.breakpoints.visible) {

        css += "/* Unit Breakpoints */";
        css += '<br />';

        

        i_break = '';
        brk = '';
        i_brk_array = [];
        breakpoints = [];

        /* fake it till its working */
        breakpoints.push({
          min_width : 400,
          max_width : 800
        });

        // combine Basic and Extra
				// all = [].concat(basic, settings.breakpoints.extra);


				// loop through and print ALL the breakpoints to css
				for (i = 0; i < breakpoints.length; i += 1) {

					i_o = breakpoints[i];
					css +=  "@media only screen";

					if (i_o.hasOwnProperty('min_width')) {
						i_unit_type = (typeof(i_o.min_width) === "string") ? "" : "px";
						css += " and (min-width : "+ i_o.min_width + i_unit_type + ")";
						i_break += "min";
						i_brk_array.push(i_o.min_width);
					}

					if (i_o.hasOwnProperty('min_device_width')) {
						i_unit_type = (typeof(i_o.min_device_width) === "string") ? "" : "px";
						css += " and (min-device-width : "+ i_o.min_device_width + i_unit_type + ")";
					}

					if (i_o.hasOwnProperty('max_width')) {
						i_unit_type = (typeof(i_o.max_width) === "string") ? "" : "px";
						css += " and (max-width : " + i_o.max_width + i_unit_type + ")";
						i_break += "max";
						i_brk_array.push(i_o.max_width);
					}

					if (i_o.hasOwnProperty('max_device_width')) {
						i_unit_type = (typeof(i_o.max_device_width) === "string") ? "" : "px";
						css += " and (max-device-width : " + i_o.max_device_width + i_unit_type + ")";
					}

					if (i_o.hasOwnProperty('orientation')) {
						css += " and (orientation : " + i_o.orientation + ")";
					}

					switch (i_break) {
            case 'min':
              brk = 'min' + i_brk_array[0];
              break;
            case 'max':
              brk = 'max' + i_brk_array[0];
              break;
            case 'minmax':
              brk = 'brk-' + i_brk_array[0] + '-' + i_brk_array[1];
              break;
					}

					css += " {";
					css += "<br />";

					// define unit widths at this breakpoint
          for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
            i_total = i * the.unit_width;
            css += "&#9;.u-" + i + '-' + brk + " {width: " + i_total + "px;}  <br />";
          }


					css += "}";
					css += "<br />";
				}
      }
      
      // breakpoints
      if(the.font.visible) {
        css += "<br />";
				css += "/*<br />";
				css += " * Baseline Micro-Styles<br />";
				css += " */<br />";
        
        // build scaffolding        
				css += "<br />";
				css += "/* font-size scaffolding - intended for prototyping during development */<br />";
				for (i = 0; i < the.font.scaffold.overrides.length; i += 1) {
					i_px = the.font.scaffold.overrides[i];
					i_em = (i_px / 16).toString();
					css += ".f-" + i_px + " {font-size: " + i_em + "em;} <br />";
				}
        
        css += '<br />';
        
        for (i = 0; i < the.font.scaffold.core.length; i += 1) {
					i_core_px = the.font.scaffold.core[i];

						
					for (j = 0; j < the.font.scaffold.overrides.length; j++) {
						j_override_px = the.font.scaffold.overrides[j];
						j_em = (j_override_px / i_core_px ).toString();
						css += ".f-" + i_core_px + " .f-" + j_override_px + " {font-size: " + j_em + "em;}<br />";
						
					}
				}
				css += '<br />';
				
				
        // build core
        css += "<br />";
        for (i = 0; i < the.font.core.length; i += 1) {
          i_core = the.font.core[i];
          // i_core.size
          // i_core.line_height
          core_class = ".f-" + i_core.size + '-' + i_core.line_height;
          
          
          css += '/*<br />';
          css += ' * core design font size &amp; baseline choice<br />';
          css += ' *' + tab + 'font size ' + i_core.size + 'px<br />';
          css += ' *' + tab + 'baseline  ' + i_core.line_height + 'px<br />';
          css += ' *' + tab + core_class + '<br />';
          css += ' *<br />';
          css += ' *' + tab + 'this class is intended to set the font-size and baseline for a page or region, and<br />';    
          css += ' *' + tab + 'should not be used on any element with an ancestor set to a font-size other than 100% <br />';
          css += ' */<br />';
          
          css += "<br />";
          css += core_class + ' {<br />';
          css += tab + 'font-size: ' + (i_core.size / 16).toString() + 'em;<br />';
          css += tab + 'line-height: ' + (i_core.line_height / i_px).toString() + 'em;<br />';
          css += '}';
          css += "<br />";
          
          // font-sizes
          css += "<br />";
          css += "/* font sizes */<br />";
          for (i = 0; i < the.font.scaffold.overrides.length; i += 1) {
  					i_px = the.font.scaffold.overrides[i];
  					i_font_size = (i_px / i_core.size).toString() + 'em';
  					i_line_height = (i_core.line_height / i_px).toString() + 'em';
  					/*
  					css += core_class + " .f-" + i_px + ",<br />";
  					css += ".f-" + i_core.size + " .f-" + i_px + " {";
  					css += "<br />";
  					css += tab + "font-size: " + i_font_size + ";";
  					css += "<br />";
  					css += tab + "line-height: " + i_line_height + ";";
  					css += "<br />";
  					css +="} <br />";
  					*/
  					css += core_class + " .f-" + i_px + " {";
  					css += "font-size: " + i_font_size + ";";
  					css +="} <br />";
  				}
  				
  				// baselines
  				css += "<br />";
  				css += "/* line heights - baseline " + i_core.line_height + "px */<br />";
  				for (i = 0; i < the.font.scaffold.overrides.length; i += 1) {
  				  i_px = the.font.scaffold.overrides[i];
  				  
  				  i_line_height = (i_core.line_height / i_px).toString() + 'em';
  				  
  				  css += core_class + " .f-" + i_px + " {line-height: " + i_line_height + ";}<br />";
  				}
  				
        }
      }

/*
.f-14-24 {font-size: 0.875em;}

* ancestor is f-14 or f-14-24 *
.f-14-24 .f-10, .f-14 .f-10 {font-size: 0.7142857142857143em;}
.f-14-24 .f-11, .f-14 .f-11 {font-size: 0.7857142857142857em;}


* baseline 24px *
.f-14-24 .f-10 {line-height:2.4em;}
.f-14-24 .f-11 {line-height:2.1818181818181817em;}
.f-14-24 .f-12 {line-height:2em;}
.f-14-24 .f-13 {line-height:1.8461538461538463em;}
.f-14-24,
.f-14-24 .f-14 {line-height:1.7142857142857142em;}
.f-14-24 .f-15 {line-height:1.6em;}
.f-14-24 .f-16 {line-height:1.5em;}
.f-14-24 .f-18 {line-height:1.3333333333333333em;}
*/

      css += '<br />';
      $('#css-output').html(css);
    }
  };

  $(function () { // ready
    unit_generator.init();
  }); // eo:ready

}(jQuery));