
var CONTROLLER = CONTROLLER || {};

CONTROLLER.HERO = (function(window){

	var hero = {};

	var heroIndex = 0;

	this.prevSlideButton = undefined; 
	this.nextSlideButton = undefined; 
	this.slideModules = undefined; 
	this.modulesLength = undefined;

	this.isTouch = undefined;

	hero.nextSlide = function() {
		var currentNode = this.slideModules[heroIndex],
			nextNode = this.slideModules[heroIndex + 1];

		currentNode.className = "slide-module prev-slide-module";
		nextNode.className = "slide-module current-slide-module";
		
		heroIndex++;
	}

	hero.prevSlide = function() {
		var currentNode = this.slideModules[heroIndex],
			prevNode = this.slideModules[heroIndex - 1];

		currentNode.className = "slide-module next-slide-module";
		prevNode.className = "slide-module current-slide-module";
		
		heroIndex--;
	}

	hero.slideInit = function() {
		var touchStartX = undefined,
			touchEndX = undefined;

		this.prevSlideButton = document.getElementById("slide-left-button");
		this.nextSlideButton = document.getElementById("slide-right-button");
		this.slideModules = document.getElementsByClassName("slide-module");
		this.slideEl = VIEW.HERO.slideEl;
		this.modulesLength = this.slideModules.length;

		function touchStart(e) {
			touchStartX = e.changedTouches[0].clientX
			e.preventDefault();
		}

		function touchEnd(e) {
			touchEndX = e.changedTouches[0].clientX;
			e.preventDefault();

			if (touchStartX > touchEndX && heroIndex < hero.modulesLength - 1) {
				hero.nextSlide();
			} else if(touchStartX < touchEndX && heroIndex > 0) {
				hero.prevSlide();
			}
		}


		this.slideEl.addEventListener("touchstart", touchStart, false);
		this.slideEl.addEventListener("touchend", touchEnd, false);

	}

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