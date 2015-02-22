
var VIEW = VIEW || {};

VIEW.MENU = (function(window){

	var menu = {};

	this.appetizerEl = undefined;
	this.entreeEl = undefined;
	this.dessertEl = undefined;

	menu.populateMenu = function(node, menuItems, category) {

		node.innerHTML = '';

		for (i = 0; i < menuItems.length; i++) {
			node.innerHTML = node.innerHTML +
			'<div class="appetizer-module">' + 
			'<img class="menu-image" src="/assets/images/menu/'+ category +'/' + menuItems[i].name + '.jpg"/><div class="module-text"><h3>' + 
			menuItems[i].title + '</h3><p>' + menuItems[i].description + '</p></div></div>';
		}

	}

	menu.appetizerTemplate = function() {

		var appetizerMenu = CONFIG.MENU.APPETIZER,
			entreeMenu = CONFIG.MENU.ENTREE,
			dessertMenu = CONFIG.MENU.DESSERT;

		this.appetizerEl = document.getElementById('menu-appetizer');
		this.entreeEl = document.getElementById('menu-entree');
		this.dessertEl = document.getElementById('menu-dessert');

		menu.populateMenu(this.appetizerEl, appetizerMenu, 'appetizer');
		menu.populateMenu(this.entreeEl, entreeMenu, 'entree');
		menu.populateMenu(this.dessertEl, dessertMenu, 'dessert');

		//CONTROLLER.menu.appetizerInit();
	}


	menu.init = function() {
		menu.appetizerTemplate();
	}

	return menu;

}(window));