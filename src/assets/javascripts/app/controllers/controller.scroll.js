
var CONTROLLER = CONTROLLER || {};

CONTROLLER.SCROLL = (function(window){

	var scroll = {};

	var sectionIndex = 0,
		sectionHeight = window.innerHeight,
		touchStartY = undefined,
		touchEndY = undefined,
		touchDif = undefined,
		touchMoveY = undefined,
		newTouchMoveY = undefined,
		target = undefined,
		lastTouchMoveY = undefined,
		isTouchMoveDisabled = false;

	this.navEl = undefined;
	this.mainSection = undefined;
	this.mainSectionLength = undefined;
	this.navButtons = undefined;
	this.logoButton = undefined;

	scroll.nextScroll = function() {

		if (sectionIndex === 0) {
			VIEW.SCROLL.onScroll(1);
			VIEW.SCROLL.updateNav(1);
			//VIEW.SCROLL.logoMini(true);
			sectionIndex++;
		} else if (sectionIndex > 0 && sectionIndex < this.mainSectionLength - 1) {
			VIEW.SCROLL.onScroll(sectionIndex + 1);
			VIEW.SCROLL.updateNav(sectionIndex + 1);
			sectionIndex++;
		}
	}

	scroll.prevScroll = function() {

		if (sectionIndex === 1) {
			//VIEW.SCROLL.logoMini(false);
		}

		if (sectionIndex > 0) {
			VIEW.SCROLL.onScroll(sectionIndex - 1);
			VIEW.SCROLL.updateNav(sectionIndex - 1);
			sectionIndex--;
		}
	}

	scroll.defaultScroll = function(direction, index) {

		sectionIndex = index;

		if( direction === "next") {
			scroll.nextScroll();
		} else {
			scroll.prevScroll();
		}
	}

	scroll.touchStart = function(e) {
		//console.log("touchStart", e);
		touchStartY = e.changedTouches[0].clientY;
		touchMoveY = touchStartY;
		target = e.target;

		e.preventDefault();
	}

	scroll.touchMove = function(e) {

		newTouchMoveY = e.changedTouches[0].clientY;

		var touchMoveDif = touchMoveY - newTouchMoveY;

		e.preventDefault();

		if (touchMoveDif > 30 && !isTouchMoveDisabled) {

			scroll.nextScroll();

			isTouchMoveDisabled = true;

		} else if(touchMoveDif < -30 && !isTouchMoveDisabled) {
			
			scroll.prevScroll();

			isTouchMoveDisabled = true;
		}
	}

	scroll.touchEnd = function(e, isFeed) {

		touchEndY = e.changedTouches[0].clientY;
		touchDif = touchStartY - touchEndY;
		isTouchMoveDisabled = false;

		if (touchDif > 0) {
			e.preventDefault();
		} else if(touchDif < 0) {
			e.preventDefault();
		}
	}

	scroll.onListenTouch = function() {

		for (i = 0; i < this.mainSectionLength; i++) {
			this.mainSection[i].addEventListener("touchstart", scroll.touchStart, false);
			this.mainSection[i].addEventListener("touchmove", scroll.touchMove, false);
			this.mainSection[i].addEventListener("touchend", scroll.touchEnd, false);
		}

		if (!CONTROLLER.MAIN.isTouch) {
			scroll.onListenWheel()
		}
	}

	scroll.offListenTouch = function() {

		for (i = 0; i < this.mainSectionLength; i++) {
			this.mainSection[i].removeEventListener("touchstart", scroll.touchStart, false);
			this.mainSection[i].removeEventListener("touchmove", scroll.touchMove, false);
			this.mainSection[i].removeEventListener("touchend", scroll.touchEnd, false);
		}

		if(!CONTROLLER.MAIN.isTouch) {
			scroll.offListenWheel();
		}
	}

	scroll.onListenWheel = function() {

		var isScrollTimeout = 0,
			scrollTimeInterval = undefined;


		function onScrollTimeOut() {
			var scrollTimeOut = setTimeout(function(){
				isScrollTimeout = 0;
			},800);

			isScrollTimeout = 3;
		}

		function onMouseWheel(e) {
			//console.log(e.deltaY);
			if(e.deltaY < 0 && e.deltaY > -100 && !isScrollTimeout){

				//console.log(e.deltaY);
				scroll.nextScroll();
				onScrollTimeOut();

			} else if (e.deltaY > 0 && e.deltaY < 100 &&!isScrollTimeout) {

				//console.log(e.deltaY);
				scroll.prevScroll();
				onScrollTimeOut();
			}



			e.preventDefault();
			e.stopPropagation();
		}

		$("body").on("mousewheel", onMouseWheel);
	}

	scroll.offListenWheel = function() {
		$("body").off("mousewheel");
	}

	scroll.onNavClick = function() {

		for (i = 0; i < this.navButtons.length; i++) {
			scroll.navButtons[i].addEventListener("click", function(e) {
				var id = this.getAttribute("data-id");
				VIEW.SCROLL.onScroll(id);
				VIEW.SCROLL.updateNav(id);
				sectionIndex = parseInt(id);
			}, false);
		}

		this.logoButton.addEventListener("click", function(e) {
			VIEW.SCROLL.onScroll(0);
			VIEW.SCROLL.updateNav(0);
			sectionIndex = 0;
		}, false);

	}

	scroll.init = function() {

		this.navEl = document.getElementById("nav");
		this.mainSection = document.getElementsByClassName("section");
		this.navButtons = document.getElementsByClassName("nav-buttons");
		this.mainSectionLength = this.mainSection.length;
		this.logoButton = document.getElementById("logo-wannae");


		scroll.onNavClick();
		//VIEW.SCROLL.listenNav();
		//scroll.onListenTouch();
		scroll.onListenWheel();

	}

	$(window).on("beforeunload", function() {
		$(window).scrollTop(0);
	});

	$(window).on("load", function(){
		$(window).scrollTop(0);
	});

	return scroll;

}(window));