
var VIEW = VIEW || {};

VIEW.SCROLL = (function(window){

	var scroll = {};

	var initialScroll = false,
		duration = 500;

	scroll.onScroll = function(index) {

		var newOffset = $(CONTROLLER.SCROLL.mainSection[index]).offset(),
			newY = newOffset.top;

		$.smoothScroll({
			scrollElement: $("html, body"),
			scrollTarget: CONTROLLER.SCROLL.mainSection[index]
		});

		// $("body").animate({
		// 	scrollTop: newY
		// }, 500, "easeOutQuad", function(){
		// 	$("body").scrollTop(newY);
		// });

		if(index === 2) {
			CONTROLLER.SCROLL.arrowDownButton.className = "icon-arrow-down arrow-black";
		} else if (index === 3) {
			CONTROLLER.SCROLL.arrowDownButton.className = "icon-arrow-down hidden";
		} else {
			CONTROLLER.SCROLL.arrowDownButton.className = "icon-arrow-down";
		}
	}

	scroll.testScroll = function() {
		$("body").animate({
			scrollTop: 920
		}, 500, "easeOutQuad", function(){
			console.log("current test scrollTop", $("body").scrollTop());
		});
	}

	scroll.logoMini = function(state){

		if(state) {
			CONTROLLER.SCROLL.navEl.className = "nav nav-minimized";
		} else if (!state) {
			CONTROLLER.SCROLL.navEl.className = "nav";
		}
		
	}

	return scroll;

}(window));