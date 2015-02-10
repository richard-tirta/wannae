
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
		lastTouchMoveY = undefined;

	this.navEl = undefined;
	this.mainSection = undefined;
	this.mainSectionLength = undefined;
	this.arrowDownButton = undefined;

	scroll.nextScroll = function() {

		if (sectionIndex === 0) {
			VIEW.SCROLL.onScroll(1);
			VIEW.SCROLL.logoMini(true);
			sectionIndex++;
		} else if (sectionIndex > 0 && sectionIndex < this.mainSectionLength - 1) {
			VIEW.SCROLL.onScroll(sectionIndex + 1);
			sectionIndex++;
		}
	}

	scroll.prevScroll = function() {

		if (sectionIndex === 1) {
			VIEW.SCROLL.logoMini(false);
		}

		if (sectionIndex > 0) {
			VIEW.SCROLL.onScroll(sectionIndex - 1);
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

		if (touchMoveDif > 10) {
			var currentScroll = $("body").scrollTop();
			var newScroll = currentScroll + 12;

			$("body").scrollTop(newScroll);


			if (lastTouchMoveY < newTouchMoveY) {
				touchMoveY = newTouchMoveY;
			}

		} else if(touchMoveDif < -10) {
			var currentScroll = $("body").scrollTop();
			var newScroll = currentScroll - 12;

			console.log(touchMoveDif);

			$("body").scrollTop(newScroll);

			if (lastTouchMoveY > newTouchMoveY) {
				touchMoveY = newTouchMoveY;
			}
		}

		lastTouchMoveY = newTouchMoveY;
		e.preventDefault();
	}

	scroll.touchEnd = function(e, isFeed) {
		var hasManhattan = $(target).hasClass("callout-manhattan"),
			hasBrooklyn = $(target).hasClass("callout-brooklyn"),
			hasVipManhattan = $(target).closest("#vip-manhattan").length,
			hasVipBrooklyn = $(target).closest("#vip-brooklyn").length;

		touchEndY = e.changedTouches[0].clientY;
		touchDif = touchStartY - touchEndY;
		//sectionHeight = window.innerHeight;

		//console.log(target);
		//console.log(hasVipManhattan);

		if (touchDif > 0) {
			//console.log("next");
			scroll.nextScroll();
			e.preventDefault();
		} else if(touchDif < 0) {
			scroll.prevScroll();
			e.preventDefault();
			//console.log("prev");
		} else if (hasVipManhattan) {
			window.open("https://www.google.com/maps/dir/Current+Location/40.749932,-73.990991","_blank");
		} else if (hasVipBrooklyn){
			window.open("https://www.google.com/maps/dir/Current+Location/40.682755,-73.976882","_blank");
		} else if (hasManhattan) {

			VIEW.MAIN.onOpenTab("map");
			VIEW.MAP.onOpenMapTab("manhattan");
			VIEW.MAP.onMapToggle("manhattan");

		} else if (hasBrooklyn) {

			VIEW.MAIN.onOpenTab("map");
			VIEW.MAP.onOpenMapTab("brooklyn");
			VIEW.MAP.onMapToggle("brooklyn");

		}
	}

	scroll.onListenTouch = function() {

		// window.addEventListener("touchstart", scroll.touchStart, false);
		// window.addEventListener("touchend", scroll.touchEnd, false);

		for (i = 0; i < this.mainSectionLength; i++) {
			this.mainSection[i].addEventListener("touchstart", scroll.touchStart, false);
			this.mainSection[i].addEventListener("touchmove", scroll.touchMove, false);
			this.mainSection[i].addEventListener("touchend", scroll.touchEnd, false);
		}

		// $(window).load(function() {
		// 	for (i = 0; i < this.mainSectionLength; i++) {
				
		// 	}
		// }

		CONTROLLER.MAIN.registerButtonEl.addEventListener("touchstart", scroll.touchStart, false);
		CONTROLLER.MAIN.registerButtonEl.addEventListener("touchend", scroll.touchEnd, false);

		if (!CONTROLLER.MAIN.isTouch) {
			scroll.onListenWheel()
		}
	}

	scroll.offListenTouch = function() {
		//window.removeEventListener("touchstart", scroll.touchStart, false);
		//window.removeEventListener("touchend", scroll.touchEnd, false);

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

		// function onScrollTimeInterval() {

		// 	var scrollTimeInterval = setInterval(function() {

		// 		if(isScrollTimeout > 0) {
		// 			isScrollTimeout--;
		// 		} else {
		// 			//console.log("DONE");
		// 			clearInterval(scrollTimeInterval);
		// 		}
		// 		//console.log(isScrollTimeout)
		// 	}, 50);

			
		// }

		function onScrollTimeOut() {
			var scrollTimeOut = setTimeout(function(){
				isScrollTimeout = 0;
			},800);

			isScrollTimeout = 3;
		}

		function onMouseWheel(e) {
			//console.log(e.deltaY);
			if(e.deltaY < 0 && e.deltaY > -100 && !isScrollTimeout){

				console.log(e.deltaY);
				scroll.nextScroll();
				onScrollTimeOut();

			} else if (e.deltaY > 0 && e.deltaY < 100 &&!isScrollTimeout) {

				console.log(e.deltaY);
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

	scroll.init = function() {

		this.navEl = document.getElementById("nav");
		this.arrowDownButton = document.getElementById("icon-arrow-down");
		this.mainSection = document.getElementsByClassName("section");
		this.mainSectionLength = this.mainSection.length;

		//console.log(sectionHeight);

		scroll.onListenTouch();

		this.arrowDownButton.addEventListener("click", function(e) {
			e.preventDefault();
			scroll.nextScroll();
		}, false);

	}

	$(window).on("beforeunload", function() {
		$(window).scrollTop(0);
	});

	$(window).on("load", function(){
		$(window).scrollTop(0);
	});

	return scroll;

}(window));