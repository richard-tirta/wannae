
var VIEW = VIEW || {};

VIEW.MAP = (function(window){

	var map = {};

	map.tabMapInit = function(mapObject, eventList, el, lat, lng, zoom) {
		var eventList = eventList;

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
			scrollwheel: true,
			panControl: false,
			streetViewControl: false,
			draggable : true,
			overviewMapControl: true,
			overviewMapControlOptions: {
				opened: false,
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: CONFIG.LOCATION.STYLE
		}

		mapObject = new google.maps.Map(mapElement, mapOptions);
		
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

			marker = new google.maps.Marker({
				icon: markerIcon,
				position: new google.maps.LatLng(eventList[i].latitude, eventList[i].longitude),
				map: mapObject,
				title: eventList[i].title,
				desc: eventList[i].description,
				tel: eventList[i].telephone,
				email: eventList[i].email,
				web: eventList[i].web
			});
			link = '';

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {

					//CONTROLLER.TRACKING.mapTracking(el);
					
					var mapDirectionUrl = "https://www.google.com/maps/dir/Current+Location/" + 
					eventList[i].latitude +","+ eventList[i].longitude;

					infoWindow.setContent(
						"<h6>" +
						eventList[i].title + 
						"</h6><p><strong>" +
						eventList[i].address +
						"</strong></p><a target='_blank' class='map-direction-link' href='" + 
						mapDirectionUrl +
						"'><p><strong>GET DIRECTIONS</strong></p></a>"
					);
					infoWindow.open(mapObject, marker);
				}
			})(marker, i));
		}
	}

	map.tabMapOnReady = function() {

		var tabMapLocation = undefined,
			latitude = 37.766237,
			longitude = -122.44423,
			zoom = 12;

		map.tabMapInit(
			tabMapLocation,
			CONFIG.LOCATION.EVENT,
			"location-map", 
			latitude, 
			longitude, 
			zoom
		);

	}

	map.calendarInit = function() {

		var data = {};
		data.key = "AIzaSyCYCvF5ysyzIWgMTt6bTYtm_LdqSb2xiR8";

		console.log(data);

		$.ajax({
			type: "GET",
			url: "https://www.googleapis.com/calendar/v3/calendars/gjr00mo0ha62qrfoaandjri3co%40group.calendar.google.com/events",
			data: data,
			dataType: "json",
			success: function(response){
				//console.log(response);
				//console.log(response.items)
				map.populateCalendar(response.items);
			}
		});
		//https://www.googleapis.com/calendar/v3/calendars/gjr00mo0ha62qrfoaandjri3co%40group.calendar.google.com/events?key=AIzaSyCYCvF5ysyzIWgMTt6bTYtm_LdqSb2xiR8
	}

	map.populateCalendar = function(data) {

		for (i = 0; i < data.length; i++) {
			//console.log(data[i]);
			if(data[i].location) {
				console.log(data[i].location);
			}

		}
		
	}

	map.init = function() {

		function loadGMapAPI() {

			var script = document.createElement('script');

			script.type = 'text/javascript';
			
			script.src = "https://maps.googleapis.com/maps/api/js?" +
			"key=AIzaSyCYCvF5ysyzIWgMTt6bTYtm_LdqSb2xiR8&sensor=false&extension=.js&callback=VIEW.MAP.tabMapOnReady";

			document.body.appendChild(script);
		}

		window.onload = loadGMapAPI;

		map.calendarInit();

	}

	return map;

}(window));