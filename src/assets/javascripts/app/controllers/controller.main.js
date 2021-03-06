
var CONTROLLER = CONTROLLER || {};

CONTROLLER.MAIN = (function(window){

	var main = {};


	this.isTouch = undefined;

	main.init = function() {

		var isTouch = true;

		function isTouchDevice() {
		 return (('ontouchstart' in window)
		      || (navigator.MaxTouchPoints > 0)
		      || (navigator.msMaxTouchPoints > 0));
		}

		main.isTouch = isTouchDevice();
	}

	return main;

}(window));