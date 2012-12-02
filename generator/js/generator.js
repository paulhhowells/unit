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
    init : function () {
      var
        the = this,
        ui = document.ui,
        field;

      // if fields have values then update variables
      // else if empty fill the fields with default values
      for (field in the.fields) {
        if (the.fields.hasOwnProperty(field)) {
        
          console.log(field);
          console.log(the.fields[field]);
        
          if (ui.hasOwnProperty(field) && ui[field].value) {
            the.fields[field].val = ui[field].value;
          } else {
            ui[field].value = the.fields[field].val;
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

      // first run
      the.run();
    },
    run : function () {
      var
        the = this,
        i,
        i_total,
        i_width,
        css;

      the.unit_width = the.fields.column_width.val + the.fields.gutter.val;
      the.padding_left = Math.ceil(the.fields.gutter.val / 2);
      the.padding_right = Math.floor(the.fields.gutter.val / 2);

      css = '';
      css += "/*<br />"; 
      css += " *  Unit CSS system<br />";
      css += " *<br />";
      css += " *<br />";
      css += " *<br />";
      css += " */<br />";
      css += "<br />";
      
      // define unit wrapper
      css += ".u-wrapper {<br />";
      css += "&#9;/* wraps a set of unit columns  */<br />";
      css += "&#9;overflow:hidden; _overflow:visible; _zoom:1;<br />";
      css += "} <br />";
      
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
        css += ".push-" + i + " {left:" + i_width + "px;} <br />";
      }

      // pull
      for (i = 1; i <= the.fields.number_of_columns.val; i += 1) {
        i_width = (the.unit_width) * i;
        css += ".pull-" + i + " {left:-" + i_width + "px;} <br />";
      }

      css += '<br />';

      $('#css-output').html(css);
    }
  };

  $(function () { // ready
    unit_generator.init();
  }); // eo:ready

}(jQuery));