
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
			touchMoveXDif = undefined,
			touchEndX = undefined,
			touchStartY = undefined,
			touchMoveYDif = undefined,
			touchEndY = undefined,
			autoNext = true,
			timer = 2,
			isTouchMoveDisabled = false;

		this.prevSlideButton = document.getElementById("slide-left-button");
		this.nextSlideButton = document.getElementById("slide-right-button");
		this.slideModules = document.getElementsByClassName("slide-module");
		this.slideEl = VIEW.HERO.slideEl;
		this.modulesLength = this.slideModules.length;

		function autoSlide() {
			if (timer < 1) {

				if (heroIndex === hero.modulesLength - 1) {
					autoNext = false;
				} else if ( heroIndex === 0) {
					autoNext = true;
				}

				if(autoNext) {
					hero.nextSlide();
				} else {
					hero.prevSlide();
				}

				timer = 2;
			}
		}

		function touchStart(e) {
			touchStartX = e.changedTouches[0].clientX;
			touchStartY = e.changedTouches[0].clientY;
			e.preventDefault();
			timer = 2;
		}

		function touchMove(e) {
			touchMoveX = e.changedTouches[0].clientX;
			touchMoveY = e.changedTouches[0].clientY;
			touchMoveXDif = touchStartX - touchMoveX;
			touchMoveYDif = touchStartY - touchMoveY;

			e.preventDefault();

			if (touchMoveXDif > 30 && !isTouchMoveDisabled && heroIndex < hero.modulesLength - 1) {
				hero.nextSlide();
				isTouchMoveDisabled = true;
			} else if(touchMoveXDif < -30 && !isTouchMoveDisabled && heroIndex > 0) {
				hero.prevSlide();
				isTouchMoveDisabled = true;
			}

			if (touchMoveYDif > 30 && !isTouchMoveDisabled) {
				VIEW.SCROLL.onScroll(1);
				VIEW.SCROLL.updateNav(1);
			} else if (touchMoveYDif < -30 && !isTouchMoveDisabled) {
				VIEW.SCROLL.onScroll(0);
				VIEW.SCROLL.updateNav(0);
			}

			timer = 2;
			e.preventDefault();
		}

		function touchEnd(e) {
			isTouchMoveDisabled = false;
			e.preventDefault();
		}


		this.slideEl.addEventListener("touchstart", touchStart, false);
		this.slideEl.addEventListener("touchmove", touchMove, false);
		this.slideEl.addEventListener("touchend", touchEnd, false);

		this.prevSlideButton.addEventListener("click", function(e) {
			e.preventDefault();
			if (heroIndex > 0) {
				hero.prevSlide();
			}
			timer = 2;
		}, false);

		this.nextSlideButton.addEventListener("click", function(e) {
			e.preventDefault();
			if (heroIndex < hero.modulesLength - 1) {
				hero.nextSlide();
			}
			timer = 2;
		}, false);

		this.slideModules[0].className = "slide-module current-slide-module";

		setInterval(function(){ 
			autoSlide();
			timer = timer - 1;

		}, 5000);

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