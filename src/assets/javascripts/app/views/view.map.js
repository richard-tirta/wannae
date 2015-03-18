
var VIEW = VIEW || {};

VIEW.MAP = (function(window){

	var map = {};

	var apiKey = "AIzaSyCYCvF5ysyzIWgMTt6bTYtm_LdqSb2xiR8",
		locationMap = undefined;

	map.timeFormat = function(start, end) {

		var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		function minuteFormat(i, len) { var s = i + ""; len = len || 2; while (s.length < len) s = "0" + s; return s; }

		function hour12(value) {
			var hour12 = value > 12 ? value - 12 : value == 0 ? 12 : value;
			return hour12;
		}

		var space = " ";

		var year = start.getFullYear();
		var month = MMM[start.getMonth() + 1];
		var date = start.getDate();

		var day = ddd[start.getDay() + 1];

		var startHour = hour12(start.getHours());
		var endHour = hour12(end.getHours());

		var startMinute = minuteFormat(start.getMinutes());
		var endMinute = minuteFormat(end.getMinutes());

		var start12 = start.getHours() < 12 ? "AM" : "PM";
		var end12 = end.getHours() < 12 ? "AM" : "PM";

		time = day + ", " + month + space + date + space + year + ", " + 
		startHour + ":" + startMinute + start12 + " - " + endHour + ":" + endMinute + end12;

		return time;
	}

	map.GMapInit = function(eventList, el, lat, lng, zoom) {
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

		locationMap = new google.maps.Map(mapElement, mapOptions);
		
	}

	map.populateMarkers = function(location, data, time, i) {
		var infoWindow = new google.maps.InfoWindow({
			pixelOffset: new google.maps.Size(-25, 0),
			maxWidth: 160
		});

		var marker, i;
		var icon1 = "./assets/images/icon-map-pointer.png",
			icon2 = "./assets/images/icon-map-pointer-hover.png";

		var mapDirectionUrl = "https://www.google.com/maps/dir/Current+Location/" + 
				location.k +","+ location.D;

		var markerIcon = {
			url: icon1,
			size: new google.maps.Size(96, 105),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(50, 50)
		};

		marker = new google.maps.Marker({
			icon: markerIcon,
			position: location,
			map: locationMap,
			title: data.summary,
			desc: data.description
		});
		link = '';

		$("#calendar-list-" + i).on("mouseenter", function(e){
			marker.setIcon(icon2);
		});

		$("#calendar-list-" + i).on("mouseleave", function(e){
			marker.setIcon(icon1);
		});


		$("#calendar-list-" + i).on("click", function(e){
			window.open(mapDirectionUrl, "_blank");
		});

		google.maps.event.addListener(marker, 'click', (function(marker) {
			return function() {

				infoWindow.setContent(
					"<h6>" +
					data.summary + 
					"</h6><p><strong>" +
					time +
					"</strong></p><p>"+ 
					data.location +
					"</p><a target='_blank' class='map-direction-link' href='" + 
					mapDirectionUrl +
					"'><p><strong>GET DIRECTIONS</strong></p></a>"
				);
				infoWindow.open(locationMap, marker);
			}
		})(marker));
	}

	map.populateCalendar = function(data) {

		var geocoder,
			calendarListEl = document.getElementById("calendar-list");

		//console.log(data);

		function geoCode(address, data, time, i) {

			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {

					map.populateMarkers(results[0].geometry.location, data, time, i)

				} else {
					console.log("Geocode was not successful for the following reason: " + status);
				}
			});
		}

		function updateCalendar(data, time,  i) {
			
			calendarListEl.innerHTML = calendarListEl.innerHTML +
			"<li id='calendar-list-" + i + "'><h6>" + data.summary + "</h6><p><strong>" + time + 
			"</strong></p><p>" + data.location + "</p></li>";

		}

		geocoder = new google.maps.Geocoder();

		for (i = 0; i < data.length; i++) {
			//console.log(data[i]);
			if(data[i].location) {
				//console.log(data[i]);
				//console.log(data[i].location);

				if (data[i].start.date) {
					var time = data[i].start.date;
				} else {
					var start = new Date(data[i].start.dateTime);
					var end = new Date(data[i].end.dateTime)
					time = map.timeFormat(start, end);
				}

				//console.log(time);
				updateCalendar(data[i], time, i);
				geoCode(data[i].location, data[i], time, i);
			}
		}
	}

	map.calendarInit = function() {

		var data = {},
			calendarId = "wannae2014@gmail.com",
			url = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events";

		data.key = apiKey;

		//console.log(data);

		$.ajax({
			type: "GET",
			url: url,
			data: data,
			dataType: "json",
			success: function(response){
				//console.log(response);
				//console.log(response.items)
				map.populateCalendar(response.items);
			}
		});
	}

	map.onGMapReady = function() {

		var latitude = 37.766237,
			longitude = -122.44423,
			zoom = 12;

		map.GMapInit(
			CONFIG.LOCATION.EVENT,
			"location-map", 
			latitude, 
			longitude, 
			zoom
		);

		map.calendarInit();
	}

	map.init = function() {

		function loadGMapAPI() {

			var script = document.createElement('script');

			script.type = 'text/javascript';
			
			script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + 
			"&sensor=false&extension=.js&callback=VIEW.MAP.onGMapReady";

			document.body.appendChild(script);

		}

		window.onload = loadGMapAPI;

	}

	return map;

}(window));