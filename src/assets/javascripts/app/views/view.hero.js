
var VIEW = VIEW || {};

VIEW.HERO = (function(window){

	var hero = {};

	this.slideEl = undefined;

	hero.slideTemplate = function() {

		var menu = CONFIG.MENU.HERO;

		this.slideEl = document.getElementById('hero-slide');

		this.slideEl.innerHTML = '';
		
		for (i = 0; i < menu.length; i++) {
			hero.slideEl.innerHTML = hero.slideEl.innerHTML + '<div class="slide-module next-slide-module">' + 
			'<div class="menu-image ' + menu[i].name + '"></div><div class="module-text"><h3>' + 
			menu[i].title + '</h3><p>' + menu[i].description + '</p></div></div>';
		}

		CONTROLLER.HERO.slideInit();
	}


	hero.init = function() {
		hero.slideTemplate();
	}

	return hero;

}(window));