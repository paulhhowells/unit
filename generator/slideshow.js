/*jslint bitwise: true, eqeq: false, sloppy: true, white: true, browser: true, devel: true, indent: 2 */
/*globals phh, jQuery, window, location, setTimeout, clearTimeout, decodeURI, console, google, FB */

var phh = phh || {};

(function ($) {
	$(function () { // ready
  	/*
  	<div class="slideshow">
    	<div class="slides">
      	<div class="slides-inner">
        	<div class="slide slide-a">A</div>
        	<div class="slide slide-b">B</div>
        	<div class="slide slide-c">C</div>
      	</div>
    	</div>
  	</div>
  	*/
  	
  	// use resize.register(callback_function, optional_argument)
  	// to register callbacks that fire on window resize event
  	var resize = (function () {
    	var callbacks = [];
    	$(window).resize(function() {
      	var i;
      	for (i = 0; i < callbacks.length; i += 1) {
        	callback = callbacks[i];
        	if (callback.hasOwnProperty('arg')) {
          	callback.func(callback.arg)
        	} else {
          	callback.func();
        	}
      	}
    	});	
    	return {	
      	register : function (f, arg) {
        	var callback = {
          	func : f
        	};
        	if (arg) {
          	callback.arg = arg;
        	}
        	callbacks.push(callback);
      	}
    	};
  	})();
  	
 
  	// test that resize register works
  	resize.register(function (val) {
    	console.log('registered' + val);
  	}, 56);
  	
  	// rough mockup of slideshow before refactoring for ease of re-use
  	var slideshow = {
  	  mode : 'centre', //'centre', // centre or left
  	  $slideshow : null,
    	make : function ($slideshow) {
        var
          $slides,
          width,
          rework;
        
        this.$slideshow = $slideshow;
        
        // console.log(this.mode);
         
        //$slideshow = $(this);
        $slides = $('.slide', $slideshow);
        width = 0;
        
        // get total width of slides
        $slides.
          each(function () {
            var $slide = $(this);
            width += $slide.outerWidth();
          });
        
        $('.slides-inner', $slideshow).
          first().
          width(width).
          css({'left' : '0'}); // '-200px'});
          

        switch(this.mode) {
          case 'centre':
            $('.slides').css({'left' : '50%'});
            break;
          case 'left':
          default:
            $('.slides').css({
              'width' : '800',
              'margin' : '0 auto 0 auto'
            });
            // and slides-inner must be adjusted by half each slides width
            break;
        }       

      },
      goto : function (id) {
        console.log('goto ' + id);
        var
          total_width = 0,
          slide_array = [],
          offset;
        
        // loop thru all slides to calc width of slides-inner
        // make an array of slides
        $('.slide', this.$slideshow).
          each(function () {
            var 
              $slide = $(this),
              slide_width = $slide.outerWidth();
            total_width += slide_width;
            slide_array.push({
              el : this,
              width : slide_width
            });
          });
        
        // apply width to slides inner (slowly ?)
        $('.slides-inner', this.$slideshow).
          first().
          width(total_width);
        
        if (this.mode === 'left') {
          offset = 480;
        } else if (this.mode === 'centre') {
          // $('.slides').css({'left' : '50%'});
          offset = 0;
          
        }
        
        
        // get width of target slide
        // divide it by 2
        // calc target position of slides-inner / sliding-frame
        
        // somewhere a record should be kept of current position
        
        // animate from current to target
      }
  	};
  	
  	// make an api, this will more likely be called from tabs
  	$('.slideshow').each(function () {
  	  
      slideshow.make($(this));
      
      $('.slide', this).
        each(function (i) {
          var $link = $('<a />');
          
          $link.
            html(i).
            attr({'href': '#'}).
            click(function (ev) { 
              slideshow.goto(i);
              return false;
            }).
            appendTo('.slideshow');  
        });  
      
    });
  	
  	
  	
  	
	}); // eo:ready
}(jQuery));
