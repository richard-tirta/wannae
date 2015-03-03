//	Note that Gruntfile is being setup so it loads vendor first, everything other than main.js and main.js at the very end.
//  Therefore make sure you put your document.ready() or any initialization here 
//  unless you use other kind of setup such as require.js or angularj.js

'use strict';

console.log("V1");

document.addEventListener("DOMContentLoaded", function(event) { 

	CONTROLLER.MAIN.init();
	VIEW.HERO.init();
	CONTROLLER.HERO.init();
	VIEW.MENU.init();
	CONTROLLER.SCROLL.init();
	//CONTROLLER.MAP.init();
	//VIEW.MAIN.init();
	VIEW.MAP.init();

});

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	}
});
