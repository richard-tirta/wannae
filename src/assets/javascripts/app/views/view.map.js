
var VIEW = VIEW || {};

VIEW.MAP = (function(window){

	var map = {};

	var isExpand = false;

	this.eventDetailsManhattan = undefined;
	this.eventDetailsBrooklyn = undefined;
	this.eventDetailsStores = undefined;

	this.manhattanMapContainer = undefined;
	this.brooklynMapContainer = undefined;
	this.storesMapContainer = undefined;

	this.eventListManhattanEl = undefined;
	this.eventListBrooklynEl = undefined;

	this.storeListEl = undefined;

	this.mapDetailContent = undefined;

	map.mainMapInit = function() {

		var map;

		function mapInit() {
			var mapElement = document.getElementById('asw-map');

			var mapOptions = {
				center: new google.maps.LatLng(
					CONFIG.MAP.DEFAULT.latitude,
					CONFIG.MAP.DEFAULT.longitude
				),
				zoom: CONFIG.MAP.DEFAULT.zoom,
				zoomControl: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.DEFAULT,
				},
				disableDoubleClickZoom: true,
				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				},
				scaleControl: false,
				scrollwheel: false,
				panControl: false,
				streetViewControl: false,
				draggable : false,
				overviewMapControl: true,
				overviewMapControlOptions: {
					opened: false,
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: CONFIG.MAP.STYLE
			}

			var map = new google.maps.Map(mapElement, mapOptions);
		}

		google.maps.event.addDomListener(window, 'load', mapInit);

	}

	map.tabMapInit = function(eventList, el, lat, lng, zoom) {
		var eventList = eventList;

		var map;

		function mapInit() {
			var mapElement = document.getElementById(el);

			var mapOptions = {
				center: new google.maps.LatLng(
					lat,
					lng
				),
				zoom: zoom,
				zoomControl: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.DEFAULT,
				},
				disableDoubleClickZoom: true,
				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				},
				scaleControl: true,
				scrollwheel: false,
				panControl: false,
				streetViewControl: false,
				draggable : true,
				overviewMapControl: true,
				overviewMapControlOptions: {
					opened: false,
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: CONFIG.MAP.STYLE
			}

			var map = new google.maps.Map(mapElement, mapOptions);
			
			var infoWindow = new google.maps.InfoWindow({
				pixelOffset: new google.maps.Size(-25, 0),
				maxWidth: 150
			});

			
			var marker, i;

			var markerIcon = {
				url: "./assets/images/icon-map-pointer.png",
				size: new google.maps.Size(96, 105),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(50, 50)
			};

			for (i = 0; i < eventList.length; i++) {

				var mapDirectionUrl = "https://www.google.com/maps/dir/Current+Location/" + 
										eventList[i].latitude +","+ eventList[i].longitude;

				marker = new google.maps.Marker({
					icon: markerIcon,
					position: new google.maps.LatLng(eventList[i].latitude, eventList[i].longitude),
					map: map,
					title: eventList[i].title,
					desc: eventList[i].description,
					tel: eventList[i].telephone,
					email: eventList[i].email,
					web: eventList[i].web
				});
				link = '';

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infoWindow.setContent(
							"<h6>" +
							eventList[i].title + 
							"</h6><p><strong>" +
							eventList[i].address +
							"</strong></p><a target='_blank' class='map-direction-link' href='" + 
							mapDirectionUrl +
							"'><p><strong>GET DIRECTIONS</strong></p></a>"
						);
						infoWindow.open(map, marker);
					}
				})(marker, i));
			}
			
		}

		google.maps.event.addDomListener(window, 'load', mapInit);
	}

	map.onMapToggle = function(location) {
		CONTROLLER.MAP.manhattanToggle.className = "toggles toggles-manhattan";
		CONTROLLER.MAP.brooklynToggle.className = "toggles toggles-brooklyn";
		CONTROLLER.MAP.storesToggle.className = "toggles toggles-stores";

		this.eventDetailsManhattan.className = "event-details event-details-manhattan";
		this.eventDetailsBrooklyn.className = "event-details event-details-brooklyn";
		this.eventDetailsStores.className = "event-details event-details-stores";

		this.manhattanMapContainer.className = "event-map-container";
		this.brooklynMapContainer.className = "event-map-container";
		this.storesMapContainer.className = "event-map-container";

		if(location === "manhattan") {

			CONTROLLER.MAP.manhattanToggle.className = "toggles toggles-manhattan highlight";
			this.eventDetailsManhattan.className = "event-details event-details-manhattan show";
			this.manhattanMapContainer.className = "event-map-container show";

		} else if (location === "brooklyn") {

			CONTROLLER.MAP.brooklynToggle.className = "toggles toggles-brooklyn highlight";
			this.eventDetailsBrooklyn.className = "event-details event-details-brooklyn show";
			this.brooklynMapContainer.className = "event-map-container show";

		} else if ( location === "stores") {

			CONTROLLER.MAP.storesToggle.className = "toggles toggles-stores highlight";
			this.eventDetailsStores.className = "event-details event-details-stores show";
			this.storesMapContainer.className = "event-map-container show";

		}
	}

	map.onOpenMapTab = function(borough) {
		map.onMapToggle(borough);
		CONTROLLER.MAP.detailToggleListen();
	}

	map.onMapExpand = function() {

		if( !isExpand ) {
			this.mapDetailContent.className = "map-detail-content expand";
			CONTROLLER.MAP.expandButton.className = "expand-button expand";

			isExpand = true;
		} else {
			this.mapDetailContent.className = "map-detail-content";
			CONTROLLER.MAP.expandButton.className = "expand-button";

			isExpand = false;
		}

	}

	map.populateEventList = function() {
		var manhattanEvents = CONFIG.EVENT.MANHATTAN,
			brooklynEvents = CONFIG.EVENT.BROOKLYN,

			manhattanEventEl = this.eventListManhattanEl,
			brooklynEventEl = this.eventListBrooklynEl,

			storesEvents = CONFIG.EVENT.STORES,
			storesListEl = this.storeListEl;


		for (i = 0; i < manhattanEvents.length; i++) {
			//console.log(manhattanEvents[i]);

			if(manhattanEvents[i].type === "event") {

				var subEvents = "",
					hrLine = "";

				if(manhattanEvents[i].eventDetails) {
					
					hrLine = "<hr />"

					for (e = 0; e < manhattanEvents[i].eventDetails.length; e++) {
						
						subEvents = subEvents + "<li><h5>" + manhattanEvents[i].eventDetails[e].name +
						"</h5><p>" + manhattanEvents[i].eventDetails[e].description + "</p></li>";
					}
				}

				manhattanEventEl.innerHTML = manhattanEventEl.innerHTML +
				"<li><hr/><h5>" + manhattanEvents[i].title + 
				"</h5><a target='_blank' href='https://www.google.com/maps/dir/Current+Location/" + 
				manhattanEvents[i].latitude + "," + manhattanEvents[i].longitude + "'>" +
				manhattanEvents[i].address + "</a><p>" +
				manhattanEvents[i].description + "</p>" + hrLine + 
				"<ul class='sub-events'>"+ subEvents + "</ul>" + "</li>";

			} 
		};

		for (i = 0; i < brooklynEvents.length; i++) {
			//console.log(brooklynEvents[i]);

			if(brooklynEvents[i].type === "event") {

				var subEvents = "",
					hrLine = "";

				if(brooklynEvents[i].eventDetails) {
					
					hrLine = "<hr />"

					for (e = 0; e < brooklynEvents[i].eventDetails.length; e++) {
						
						subEvents = subEvents + "<li><h5>" + brooklynEvents[i].eventDetails[e].name +
						"</h5><p>" + brooklynEvents[i].eventDetails[e].description + "</p></li>";
					}
				}

				brooklynEventEl.innerHTML = brooklynEventEl.innerHTML +
				"<li><hr/><h5>" + brooklynEvents[i].title + 
				"</h5><a target='_blank' href='https://www.google.com/maps/dir/Current+Location/" + 
				brooklynEvents[i].latitude + "," + brooklynEvents[i].longitude + "'>" +
				brooklynEvents[i].address + "</a><p>" +
				brooklynEvents[i].description + "</p>" + hrLine + 
				"<ul class='sub-events'>"+ subEvents + "</ul>" + "</li>";

			}
		};

		for (i = 0; i < storesEvents.length; i++) {
			storesListEl.innerHTML = storesListEl.innerHTML + 
			"<li><h5>" + storesEvents[i].title + "</h5><a target='_blank' href='https://www.google.com/maps/dir/Current+Location/" + 
				storesEvents[i].latitude + "," + storesEvents[i].longitude + "'>" +
				storesEvents[i].address + "</a></li>";
		}
		
	}

	map.init = function() {

		var heightOffset = (window.innerHeight * 70),
			manhattanLat = CONFIG.MAP.MANHATTAN.latitude - ( heightOffset/ 10000000 ),
			brooklynLat = CONFIG.MAP.BROOKLYN.latitude - ( heightOffset/ 1000000 ),
			storesLat = CONFIG.MAP.STORES.latitude - ( heightOffset/ 1000000 );

		this.eventDetailsManhattan = document.getElementById("event-details-manhattan");
		this.eventDetailsBrooklyn = document.getElementById("event-details-brooklyn");
		this.eventDetailsStores = document.getElementById("event-details-stores");

		this.manhattanMapContainer = document.getElementById("manhattan-map-container");
		this.brooklynMapContainer = document.getElementById("brooklyn-map-container");
		this.storesMapContainer = document.getElementById("stores-map-container");

		this.mapDetailContent = document.getElementById("map-detail-content");	

		this.eventListManhattanEl = document.getElementById("event-list-manhattan");
		this.eventListBrooklynEl = document.getElementById("event-list-brooklyn");

		this.storeListEl = document.getElementById("store-list")


		map.tabMapInit(
			CONFIG.EVENT.MANHATTAN, 
			"manhattan-map", 
			manhattanLat, 
			CONFIG.MAP.MANHATTAN.longitude, 
			CONFIG.MAP.MANHATTAN.zoom 
		);

		map.tabMapInit(
			CONFIG.EVENT.BROOKLYN, 
			"brooklyn-map", 
			brooklynLat, 
			CONFIG.MAP.BROOKLYN.longitude, 
			CONFIG.MAP.BROOKLYN.zoom 
		);

		map.tabMapInit(
			CONFIG.EVENT.STORES, 
			"stores-map", 
			storesLat, 
			CONFIG.MAP.STORES.longitude, 
			CONFIG.MAP.STORES.zoom 
		);

		map.mainMapInit();
		map.populateEventList();

	}

	return map;

}(window));