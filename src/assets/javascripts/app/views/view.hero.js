
var VIEW = VIEW || {};

VIEW.HERO = (function(window){

	var hero = {};

	this.slideEl = undefined;

	hero.slideTemplate = function() {

		var menu = CONFIG.MENU.HERO;

		this.slideEl = document.getElementById('hero-slide__container');

		this.slideEl.innerHTML = '';
		
		for (i = 0; i < menu.length; i++) {
			hero.slideEl.innerHTML = hero.slideEl.innerHTML + '<div class="slide-module current-slide-module">' + 
			'<img src="/assets/images/hero/' + menu[i].name + '.jpg" /></div>' +
			menu[i].title + '</div>';
		}

		CONTROLLER.HERO.slideInit();
	}


	hero.init = function() {
		hero.slideTemplate();
	}

	return hero;

}(window));