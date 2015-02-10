
var CONTROLLER = CONTROLLER || {};

CONTROLLER.MAP = (function(window){

	var map = {};
	
	this.manhattanToggle = undefined;
	this.brooklynToggle = undefined;
	this.storesToggle = undefined;
	this.expandButton = undefined;

	this.calloutManhattan = undefined;
	this.calloutBrooklyn = undefined;

	map.detailToggleListen = function() {

		this.manhattanToggle.addEventListener("click", function() {
			VIEW.MAP.onMapToggle("manhattan");
		}, false);

		this.brooklynToggle.addEventListener("click", function() {
			VIEW.MAP.onMapToggle("brooklyn");
		}, false);

		this.storesToggle.addEventListener("click", function() {
			VIEW.MAP.onMapToggle("stores");
		}, false);
	}

	map.listenButtons = function() {

		this.manhattanToggle = document.getElementById("toggles-manhattan");
		this.brooklynToggle = document.getElementById("toggles-brooklyn");
		this.storesToggle = document.getElementById("toggles-stores");
		this.expandButton = document.getElementById("expand-button");
		this.calloutManhattan = document.getElementById("callout-manhattan");
		this.calloutBrooklyn = document.getElementById("callout-brooklyn");

		function openTab() {	
			VIEW.MAIN.onOpenTab("map");
			CONTROLLER.MAP.detailToggleListen();
		}

		this.expandButton.addEventListener("click", function(e){
			e.preventDefault();
			VIEW.MAP.onMapExpand();
		}, false);

		this.calloutManhattan.addEventListener("click", function(e) {
			VIEW.MAIN.onOpenTab("map");
			VIEW.MAP.onOpenMapTab("manhattan");
			VIEW.MAP.onMapToggle("manhattan");
		}, false);

		this.calloutBrooklyn.addEventListener("click", function(e) {
			VIEW.MAIN.onOpenTab("map");
			VIEW.MAP.onOpenMapTab("brooklyn");
			VIEW.MAP.onMapToggle("brooklyn");
		}, false);


	}

	map.init = function() {

		map.listenButtons();
	}

	return map;

}(window));