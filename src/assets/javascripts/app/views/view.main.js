
var VIEW = VIEW || {};

VIEW.MAIN = (function(window){

	var main = {};

	var isSocialOpen = false,
		isRegisterOpen = false,
		isLoginOpen = false;

	this.socialEl = undefined;
	this.loginEl = undefined;
	this.registerButtonEl = undefined;
	this.feedTabEl = undefined;
	this.feedDetailTabEl = undefined;

	this.mapDetailsTabEl = undefined;
	this.mapDetailsHeight = undefined;

	this.currentTab = undefined;

	main.onToggleNavButtons = function(isHidden){

		if(!isHidden) {
			CONTROLLER.MAIN.buttonBackEl.className = "button-back icon-arrow-left show";
			CONTROLLER.SCROLL.arrowDownButton.className = "icon-arrow-down hidden";
			this.registerButtonEl.className = "callout callout-register hidden";
		} else {

			CONTROLLER.MAIN.buttonBackEl.className = "button-back icon-arrow-left";
			CONTROLLER.SCROLL.arrowDownButton.className = "icon-arrow-down";
			this.registerButtonEl.className = "callout callout-register";
		}
	}

	main.tabBackListen = function() {

		function onTabBackClick(e) {
			e.preventDefault();
			
			if (main.currentTab === "login") {

				main.loginEl.className = "tab-login hidden";
				CONTROLLER.SCROLL.defaultScroll("prev", 1);
				CONTROLLER.SCROLL.navEl.className = "nav";

			} else if (main.currentTab === "map") {
							
				main.mapDetailsTabEl.className = "map-details-tab hidden";
				CONTROLLER.SCROLL.defaultScroll("next", 1);
				CONTROLLER.SCROLL.navEl.className = "nav nav-minimized";

			} else if (main.currentTab === "feed") {

				main.feedTabEl.className = "tab-feed hidden";
				CONTROLLER.SCROLL.navEl.className = "nav";
				
			}

			if (CONTROLLER.FORMS.isInSession) {
				CONTROLLER.MAIN.signOutButton.className = "button-signout show";
			}

			document.body.className = "";
			CONTROLLER.SCROLL.onListenTouch();
			
			main.onToggleNavButtons(true);

			main.currentTab = undefined;

			CONTROLLER.MAIN.buttonBackEl.removeEventListener("click", onTabBackClick, false);
		}

		CONTROLLER.MAIN.buttonBackEl.addEventListener("click", onTabBackClick, false);
	}

	main.onOpenTab = function(tab) {

		main.currentTab = tab;

		main.onToggleNavButtons(false);
		main.tabBackListen();
		CONTROLLER.SCROLL.offListenTouch();
		CONTROLLER.MAIN.signOutButton.className = "button-signout";
		document.body.className = "noscroll";
		CONTROLLER.SCROLL.navEl.className = "nav nav-minimized";

		if (main.currentTab === "login") {

			this.loginEl.className = "tab-login";

		} else if (main.currentTab === "map") {

			this.mapDetailsTabEl.className = "map-details-tab";
			
		} else if(main.currentTab === "feed") {

			this.feedTabEl.className = "tab-feed";
			this.feedDetailTabEl.className = "tab-feed-detail hidden";

		} else if (main.currentTab === "feed-detail") {

			this.feedDetailTabEl.className = "tab-feed-detail";

		};
	}


	main.onLoginClick = function(status) {
		loginStatus = status;
		
		if(loginStatus === "open") {

			main.onOpenTab("login");

		} else if (loginStatus === "success") {
			this.loginEl.className = "tab-login hidden";
			main.onOpenTab("feed");
			main.currentTab = "feed";
			CONTROLLER.MAIN.loginButtonEl.className = "callout callout-sign-in hidden";
			CONTROLLER.MAIN.viewFeedButton.className = "callout callout-view";
			
		} else if (loginStatus === "ready") {
			CONTROLLER.MAIN.loginButtonEl.className = "callout callout-sign-in hidden";
			CONTROLLER.MAIN.viewFeedButton.className = "callout callout-view";
			CONTROLLER.MAIN.signOutButton.className = "button-signout show";
		}
	}

	main.onSignOutClick = function() {
		CONTROLLER.MAIN.loginButtonEl.className = "callout callout-sign-in";
		CONTROLLER.MAIN.viewFeedButton.className = "callout callout-view hidden";
		CONTROLLER.MAIN.signOutButton.className = "button-signout";
	}

	main.onShareClick = function() {
	
		if(!isSocialOpen) {
			this.socialEl.className = "socials sharing open";
			isSocialOpen = true;
		} else{
			this.socialEl.className = "socials sharing";
			isSocialOpen = false;
		}

	}

	main.init = function() {
		this.socialEl = document.getElementById("socials");
		this.loginEl = document.getElementById("tab-login");
		this.registerButtonEl = document.getElementById("callout-register");
		this.feedTabEl = document.getElementById("tab-feed");
		this.feedDetailTabEl = document.getElementById("tab-feed-detail");
		this.mapDetailsTabEl = document.getElementById("map-details-tab");
		this.mapDetailsHeight = $(this.mapDetailsTabEl).height();
	}

	return main;

}(window));