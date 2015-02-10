
var CONTROLLER = CONTROLLER || {};

CONTROLLER.MAIN = (function(window){

	var main = {};


	this.isTouch = undefined;
	this.fbButton = undefined;
	this.twButton = undefined;
	this.emButton = undefined;

	main.listenSocialButton = function() {

		this.fbButton = document.getElementById('icon-fb');
		this.twButton = document.getElementById('icon-tw');


		this.fbButton.addEventListener('click', function(e) {
			window.open( 
				"https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.wanna-e.com", 
				'_blank', 
				'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=500, height=500'
			);

			return false;

		}, false);

		this.twButton.addEventListener('click', function(e) {
			window.open(
				"https://twitter.com/intent/tweet?text=Wanna-e%20is%20coming%20soon%20in%20February%2015%202015." +
				"&url=http%3A%2F%2Fwww.wanna-e.com%2F",
				'_blank', 
				'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=500, height=500'
			);
		}, false);
	}

	main.init = function() {

		var isTouch = true;

		function isTouchDevice() {
		 return (('ontouchstart' in window)
		      || (navigator.MaxTouchPoints > 0)
		      || (navigator.msMaxTouchPoints > 0));
		}


		main.isTouch = isTouchDevice();

		main.listenSocialButton();
	}

	return main;

}(window));