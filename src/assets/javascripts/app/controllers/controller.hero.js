
var CONTROLLER = CONTROLLER || {};

CONTROLLER.HERO = (function(window){

	var hero = {};


	this.isTouch = undefined;

	hero.init = function() {

		var isTouch = true;

		function isTouchDevice() {
		 return (('ontouchstart' in window)
		      || (navigator.MaxTouchPoints > 0)
		      || (navigator.msMaxTouchPoints > 0));
		}

		hero.isTouch = isTouchDevice();
	}

	return hero;

}(window));