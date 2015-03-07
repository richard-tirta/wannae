
var VIEW = VIEW || {};

VIEW.SCROLL = (function(window){

	var scroll = {};

	var initialScroll = false,
		duration = 500;

	scroll.onScroll = function(index) {

		var target = undefined;

		if(index === 0) {
			target = 0;
			scroll.logoMini(false);
		} else {
			scroll.logoMini(true);
			target = CONTROLLER.SCROLL.mainSection[index];
		}

		$.smoothScroll({
			scrollElement: $("html, body"),
			scrollTarget: target
		});
	}

	scroll.updateNav = function(index)  {

		index = index - 1;

		for (i = 0; i < CONTROLLER.SCROLL.navButtons.length; i++) {
			CONTROLLER.SCROLL.navButtons[i].className = "nav-buttons";
		}

		if(index >= 0) {
			CONTROLLER.SCROLL.navButtons[index].className = "nav-buttons selected";
		}
		
	}

	scroll.logoMini = function(state){

		if(state) {
			document.body.className = "minimized";
			//CONTROLLER.SCROLL.navEl.className = "nav nav-minimized";
			//CONTROLLER.SCROLL.headerEl.className = "header header-minimized";
		} else if (!state) {
			document.body.className = "";
			//CONTROLLER.SCROLL.navEl.className = "nav";
			//CONTROLLER.SCROLL.headerEl.className = "header";
		}
		
	}

	return scroll;

}(window));