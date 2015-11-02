
$(document).ready(function(){

	// GET USER LOCATION && APPEND NEARBYS
	if (navigator.geolocation) {
    	console.log('Geolocation is supported!');
  	} else {
    	console.log('Geolocation is not supported for this Browser/OS version yet.');
  	};

  	$('#comment-panel-head').hide();

  	$('#messages-panel-head').hide();

  	$('#user-panel-head').hide();

  	$('#info-panel-head').hide();

  	$('#info-maps-head').hide();

  	$('#bar-panel-head').hide();

  	$('body').addClass('profile-background');

  	navigator.geolocation.getCurrentPosition(function(position) {

  		$('.user-comments').html(null);

    	var lat = position.coords.latitude;
    	var lon = position.coords.longitude;
    	console.log(lat, lon);
    	var swlat = lat + 0.005;
    	var swlon = lon + 0.005;
    	var nelat = lat - 0.005;
    	var nelon = lon - 0.005;

    	function getLocations() {

	      	$.post('/api/yelp', userBarOptions, function (data) {

	      		var marker, i;
	      		var markers = new Array();

	      		for (var i=0; i < data.length; i++) {

	      			 var icon = {
		    			url: '//s11.postimg.org/t2zmfzvj7/marker_icon.png', // url
		    			scaledSize: new google.maps.Size(50, 50), // scaled size
		    			origin: new google.maps.Point(0,0), // origin
		    			anchor: new google.maps.Point(25, 0) // anchor
					};

	      			var marker = new google.maps.Marker({
	      				position: {lat: data[i].location.coordinate.latitude, lng: data[i].location.coordinate.longitude },
	      				map: map,
	      				animation: google.maps.Animation.DROP,
	      				title: data[i].name,
	      				icon: icon
	      			});

	      			markers.push(marker);

	      			google.maps.event.addListener(marker, 'click', (function(marker, i) {

	      				return function() {

	      					if (data[i].is_closed == false) {
								$('.info-maps-bar').html('<div class="well well-sm"><img src="' + data[i].rating_img_url_large + '"></div><div class="well well-sm">Currently Open</div><div class="well well-sm">Phone: ' + data[i].display_phone + '</div><div class="well well-sm">Review: ' + data[i].snippet_text + '</div');
							} else {
								$('.info-maps-bar').html('<div class="well well-sm"><img src="' + data[i].rating_img_url_large + '"></div><div class="well well-sm">Phone: ' + data[i].display_phone + '</div><div class="well well-sm">Review: ' + data[i].snippet_text + '</div');
							};

							$('#info-maps-head').show();

	      					$('#marker-panel-image').show();

							$('#bar-panel-name').show();

							$('.bar-panel-info').show();

	      					$('#comment-panel-head').show();

	      					$('#messages-panel-head').hide();

	      					$('#bar-panel-head').show();

	      					$('#bar-panel-name').html(data[i].name);

	      					$('#bar-maps-input').val(null);

	      					$('#bar-maps-input').val( data[i].name );

	      					$('.comments-of-bar').html(null);

	      					markerComment = data[i].name;

	      					$.get('/api/yelp/comment', function (taco) {
								for (var i=0; i<taco.length; i++) {
									console.log(markerComment);
									if (taco[i].bar == markerComment) {
										$('.comments-of-bar').prepend('<div class="well well-sm">' + taco[i].comment + '</div>');
									};
									// } else if (taco[i].bar != markerComment) {
									// };
								};
							});


	      					var barDeal = data[i].deals;


	      					if (!barDeal) {
	      						$('.bar-panel-info').html(data[i].location.cross_streets);
	      					} else if (barDeal) {
	      						barDeal = data[i].deals[i];
	      						$('.bar-panel-info').html('<div class="well well-sm">' + data[i].location.cross_streets + '</div>' + '<div class="well well-sm">' + barDeal.options[i].purchase_url + '</div>' + '<div class="well well-sm">' + barDeal.title + '</div>')
	      					};

	      					var barName = data[i].image_url;

	      					if (!barName) {
	      						barName = data[i].snippet_image_url;
	      					};

	      					$('#marker-panel-image').html('<img id="image-tab" class="center-block" src="' + barName + '">');

	      					var infoBubble = new InfoBubble({
		  						content: '<div class="center-block" id="centerthis"><img id="marker-profile-photo" src="' + barName + '"></div>',
		  						minWidth: 105,
				  				minHeight: 105,
				  				shadowStyle: 1,
				  				backgroundColor: 'rgb(57,57,57)',
				  				borderRadius: 52.5,
				  				borderWidth: 1,
				  				borderColor: '#2c2c2c',
				  				arrowStyle: 0
							});

  							if (!infoBubble.isOpen()) {
    							infoBubble.open(map, marker);
    							setTimeout(moveMapMarker, 100);
								setTimeout(moveMap, 300);
								$('#bar-click').html(data[i].name).show();
							}
  						}

					})(marker, i));

	      		};



	      		function moveMap() {
					map.panBy(0, -80);
				};

				function moveMapMarker() {
					map.setCenter(marker.getPosition());
				};

	        });

		};

    	function initMap() {

    		var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];

			var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"} );



			var myOptions = {
                zoom: 15,
                center: {lat: position.coords.latitude, lng: position.coords.longitude },
                mapTypeControlOptions: {
      				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    			},
    			disableDefaultUI: true
            };

            map = new google.maps.Map(document.getElementById('map'), myOptions);


            var icon = {
    			url: '//www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png', // url
    			scaledSize: new google.maps.Size(40, 40), // scaled size
    			origin: new google.maps.Point(0,0), // origin
    			anchor: new google.maps.Point(20, 0) // anchor
			};


			var profilePhoto = '//media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAJ4AAAAJGJjZjVhM2FmLTIyZjUtNGE2ZS1iZWYyLWRiNWU1NzNhNDk1Nw.jpg';

  			var marker = new google.maps.Marker({
    			position: {lat: position.coords.latitude, lng: position.coords.longitude },
    			map: map,
    			title: 'Hello World!',
    			icon: icon
  			});

  			infoBubble = new InfoBubble({
  				content: '<div class="center-block" id="centerthis"><img id ="marker-profile-photo" src="' + profilePhoto + '"></div>',
  				minWidth: 105,
  				minHeight: 105,
  				shadowStyle: 1,
  				backgroundColor: 'rgb(57,57,57)',
  				borderRadius: 75,
  				borderWidth: 1,
  				borderColor: '#2c2c2c',
  				arrowStyle: 0
			});

			infoBubble.open(map, marker);

			setTimeout(moveMap, 500);

  			google.maps.event.addListener(marker, 'click', function() {

  				$.post('/api/yelp', userBarLocation, function (data) {

  					$('#marker-panel-image').html('<img id="image-tab" class="center-block" src="//media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAJ4AAAAJGJjZjVhM2FmLTIyZjUtNGE2ZS1iZWYyLWRiNWU1NzNhNDk1Nw.jpg">')

  					$('#info-maps-head').hide();

  					$('#comment-panel-head').hide();

  					$('#bar-panel-name').html('Isom Durm');

  					$('.bar-panel-info').html(data[0].name);

  					$('#messages-panel-head').show();
  				});

  				if (!infoBubble.isOpen()) {
    				infoBubble.open(map, marker);
    				setTimeout(moveMapMarker, 100);
					setTimeout(moveMap, 300);
  				};
			});

			function moveMap() {
				map.panBy(0, -80);
			};

			function moveMapMarker() {
				map.setCenter(marker.getPosition());
			};

  			// marker.addListener('click', function() {
    	// 		infowindow.open(map, marker);
  			// });

  			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');

		};

    	console.log(swlat, swlon, nelat, nelon);

    	var userBarLocation = {term: 'gay+bar', bounds: swlat + ',' + swlon + '|' + nelat + ',' + nelon };
    	var userBarOptions = {term: 'gay+bar', bounds: swlat + ',' + swlon + '|' + nelat + ',' + nelon, limit: '10'};






    	// POST FUNCTION TO PUSH YELP DATA TO PROFILE PAGE
 
  		// POST FUNCTION TO PUSH YELP DATA TO PROFILE PAGE
		$.post('/api/yelp', userBarLocation, function (data) {

			$('#bar-location').html(data[0].name);

			$('#examples').show();

  		});




  		// CLICK ON PROFILE CURRENT LOCATION
  		$('#bar-location').on('click', function() {

  			$.post('/api/yelp', userBarLocation, function (data) {

  				$('.user-comments').html(null);

				if (data[0].is_closed == false) {
					$('.info-of-bar').html('<div class="well well-sm"><img src="' + data[0].rating_img_url_large + '"></div><div class="well well-sm">Currently Open</div><div class="well well-sm">Phone: ' + data[0].display_phone + '</div><div class="well well-sm">Review: ' + data[0].snippet_text + '</div');
				} else {
					$('.info-of-bar').html('<div class="well well-sm"><img src="' + data[0].rating_img_url_large + '"></div><div class="well well-sm">Phone: ' + data[0].display_phone + '</div><div class="well well-sm">Review: ' + data[0].snippet_text + '</div');
				};

				$('#bar-profile-name').html(data[0].name);

				$('#profile-panel-image').html('<img id="image-tab" class="center-block" src="' + data[0].image_url + '">');

				$('#bar-profile-input').val( data[0].name );

				$('#bar-profile-info').html(data[0].location.cross_streets);

				$('#bar-well').prepend('<div id="bar-well-center"><img class="center-block" id="bar-well-photo" src="' + data[0].image_url + '">');

				$.get('/api/yelp/comment', function (taco) {

					for (var i=0; i<taco.length; i++) {
						if (taco[i].bar == data[0].name) {
							$('.user-comments').prepend('<div class="well well-sm">' + taco[i].comment + '</div>');
						};
					};
				});
			});

  			$('#info-panel-head').show();

			$('#user-panel-head').show();

			$('#profile-panel-image').show();

			$('#bar-profile-name').show();

			$('#bar-profile-info').show();

    	});
    	// CLICK ON PROFILE CURRENT LOCATION


    	$('#back-profile').on('click', function() {

    		$('#back-profile').addClass('fadeOut');

    		$('#info-maps-head').hide();

			$.post('/api/yelp', userBarLocation, function (data) {

				$('.user-comments').html(null);

				if (data[0].is_closed == false) {
					$('.info-of-bar').html('<div class="well well-sm"><img src="' + data[0].rating_img_url_large + '"></div><div class="well well-sm">Currently Open</div><div class="well well-sm">Phone: ' + data[0].display_phone + '</div><div class="well well-sm">Review: ' + data[0].snippet_text + '</div');
				} else {
					$('.info-of-bar').html('<div class="well well-sm"><img src="' + data[0].rating_img_url_large + '"></div><div class="well well-sm">Phone: ' + data[0].display_phone + '</div><div class="well well-sm">Review: ' + data[0].snippet_text + '</div');
				};

				$('#bar-location').html(data[0].name);

				$('#bar-profile-name').html(data[0].name).hide();

				$('#profile-panel-image').html('<img id="image-tab" class="center-block" src="' + data[0].image_url + '">').hide();

				$('#bar-profile-input').val( data[0].name );

				$('#bar-profile-info').html(data[0].location.cross_streets).hide();

				$('#bar-well').prepend('<div id="bar-well-center"><img class="center-block" id="bar-well-photo" src="' + data[0].image_url + '">');

				$.get('/api/yelp/comment', function (taco) {

				for (var i=0; i<taco.length; i++) {
					if (taco[i].bar == data[0].name) {
						$('.user-comments').prepend('<div class="well well-sm">' + taco[i].comment + '</div>');
					};
				};
			});

			$('#back-profile').one('webkitAnimationEnd', function() {
				$('#back-profile').hide();
				$('#options-five').show().removeClass('fadeOut').addClass('fadeIn');
			});

  		});

		$('#marker-panel-image').hide();

		$('#bar-panel-name').hide();

		$('.bar-panel-info').hide();

		$('#comment-panel-head').hide();

		$('#messages-panel-head').hide();

    	$('body').addClass('profile-background');

		$('#map').addClass('shrink');
		
		$('#map').one('webkitAnimationEnd', function() {

			$('#profile').show().removeClass('shrink').addClass('grow');
		
			$('#examples').show().addClass('grow');
			
			$('#map').removeClass('shrink').hide();
		
		});
	});

    	// CLICK TO REDIRECT TO GOOGLE MAPS
    	$('#options-five').on('click', function() {

    		$('#options-five').addClass('fadeOut');

    		$('#examples').hide();

    		$('.user-comments').html(null);

    		$('#info-panel-head').hide();

    		$('body').removeClass('profile-background');

    		$('#user-panel-head').hide();

    		$('#profile-panel-image').hide();

    		$('#bar-profile-name').hide();

    		$('#bar-profile-info').hide();
    		
    		$('#profile').addClass('shrink');
    		
    		
    		$('#profile').one('webkitAnimationEnd', function() {
    			
    			$('#remove-top').addClass('hideForm');

    			$('#map').show().addClass('grow');
    			
    			initMap();
    			
    			getLocations();
    			
    			$('#profile').hide();
    		
    		});

    		$('#options-five').one('webkitAnimationEnd', function() {
    			$('#options-five').hide();
    			$('#back-profile').show().removeClass('fadeOut').addClass('fadeIn');
    		});

    	});
    	// CLICK TO REDIRECT TO GOOGLE MAPS
    });

	$('#back-profile').hide();

	// SUBMIT FORM FOR COMMENTS ON GOOGLE MAPS
	$('#comment-maps-form').on('submit', function(e) {

		e.preventDefault();

		var comment = $(this).serialize();

		$.post('/api/yelp/comment', comment, function (response) {
			var newComment = response;
			$('.comments-of-bar').append('<div class="well well-sm">' + newComment.comment + '</div>');
			$('#comment-maps-input').focus();
		});
	});
	// SUBMIT FORM FOR COMMENTS ON GOOGLE MAPS



	$('#comment-profile-form').on('submit', function(e) {

		e.preventDefault();

		var comment = $(this).serialize();

		$.get('/current-user', function (data) {
			console.log(data);

			$.post('/api/yelp/comment', comment, function (response) {
				var newComment = response;
				$('.user-comments').append('<div class="well well-sm">' + newComment.comment + '</div>');
				$('#comment-profile-input').focus();
			});
		});
	});







	// CHECK COOKIES IF LOGGED IN
	function checkAuth() {
		$.get('/current-user', function (data) {
			if (data.user || data.cookie) {
				$('.not-logged-in').hide();
				$('.logged-in').show();
				$('#tabs-bar').show();
			} else {
				$('.not-logged-in').show();
				$('.logged-in').hide();
				$('#tabs-bar').hide();
			};
		});
	};
	// CHECK FUNCTION IF LOGGED IN

	checkAuth();

	// SUBMIT FORM FOR SIGN UP
	$('#new-profile-form').on('submit', function(e) {
		e.preventDefault();
		var newUser = $(this).serialize();

		$.post('/api/users', newUser, function (data) {
			console.log(data);
			checkAuth();
		});
	});
	//SUBMIT FORM FOR SIGN UP




	// SUBMIT FORM FOR LOG IN ON START PAGE
	$('#form-login').on('submit', function(e) {
		e.preventDefault();
		var newUser = $(this).serialize();
		checkAuth();

		$.post('/login', newUser, function (data) {
			checkAuth();
		});
	});
	// SUBMIT FORM FOR LOG IN ON START PAGE






	// LOGOUT ON CLICK FUNCTION
	$('#logout').on('click', function() {
		$.get('/logout', function (data) {
			checkAuth();

			console.log(data.msg);
		});
	});
	// LOGOUT ON CLICK FUNCTION







// LOGGED IN DISPLAY

	$('#bar-click').addClass('hideForm');

	$('#examples').hide();

	$('#tab-image').addClass('photo-user');

	$('.options-one').addClass('photo-messages');

	$('.options-two').addClass('photo-settings');

	$('.options-three').addClass('photo-logout');

	$('.options-four').addClass('photo-users');

	$('.options-five').addClass('photo-nearbys');

	$('#profile').addClass('photo-user');

	$('#map').addClass('hideForm');











// NOT LOGGED IN DISPLAY
	$('#logo').addClass('grow').addClass('photo-logo').addClass('background-size-logo');

	$('#welcome').addClass('fadeIn');

	$('.options').addClass('fadeIn');

	$('.one').addClass('photo-login').addClass('background-size-one');

	$('.two').addClass('photo-signup').addClass('background-size-two');

	$('.three').addClass('photo-info').addClass('background-size-three');

	$('#new-profile-form').addClass('hideForm');

	$('#signup').addClass('hideForm');

	$('#info').addClass('hideForm');

	$('#form-login').addClass('hideForm');

	$('.simonsays').addClass('hideForm');

	$('.game-info').addClass('hideForm');

	var clicks = 0;

	$('#welcome').on('click', function() {
		if ($('#logo').hasClass('photo-logo') && clicks == 1) {
			$('.options').addClass('hideForm');
			$('#welcome').addClass('hideForm');
		};
	});

	$('#logo').on('click', function() {
		if ($('.options').hasClass('hideForm')) {
			$('#logo').addClass('shrink');
			$('#logo').one('webkitAnimationEnd', function() {
				$('#logo').addClass('hideForm');
				$('.simonsays').removeClass('hideForm').addClass('grow');
				$('.game-info').removeClass('hideForm').addClass('fadeIn');
				Simon.init();
			});
		};
	});

	$('#return').on('click', function() {
		$('.simonsays').addClass('shrink');
		$('.game-info').addClass('fadeOut');
		$('.simonsays').one('webkitAnimationEnd', function() {
			$('.simonsays').hide();
			$('#logo').removeClass('hideForm').removeClass('shrink').addClass('grow');
			$('.options').removeClass().addClass('grow');
			$('#welcome').removeClass().addClass('fadeIn');
		});
		$('.game-info').one('webkitAnimationEnd', function() {
			$('.game-info').addClass('hideForm');
		});
	})

	$('.one').on('click', function() {
		if ($('.two').hasClass('photo-logo')) {
			$('.two').removeClass('photo-logo').addClass('photo-signup').removeClass('background-size-three').addClass('background-size-two');
		};
		if ($('#signup').hasClass('fadeIn')) {
			$('#signup').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('.three').hasClass('photo-logo')) {
			$('.three').removeClass('photo-logo').addClass('photo-info');
		};
		if ($('#info').hasClass('fadeIn')) {
			$('#info').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('#logo').hasClass('photo-info')) {
			$('#logo').removeClass('photo-info').addClass('photo-login');
		};
		if ($('#logo').hasClass('photo-signup')) {
			$('#logo').removeClass('photo-signup').addClass('photo-login');
		};
		if ($('#new-profile-form').hasClass('fadeIn')) {
			$('#new-profile-form').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('.one').hasClass('photo-login')) {
			$('.one').removeClass('photo-login').removeClass('background-size-one').addClass('photo-logo').addClass('background-size-three');
			$('#logo').removeClass('photo-logo').addClass('photo-login').removeClass('background-size-logo').addClass('background-size-four');
			$('#welcome').removeClass('fadeIn').addClass('hideForm');
			$('#form-login').removeClass('hideForm').addClass('fadeIn');
		} else if ($('.one').hasClass('photo-logo')) {
			clicks++;
			$('.one').removeClass('photo-logo').addClass('photo-login').removeClass('background-size-three').addClass('background-size-one');
			$('#logo').removeClass('photo-login').addClass('photo-logo').removeClass('background-size-four').addClass('background-size-logo');
			$('#welcome').addClass('fadeIn').removeClass('hideForm');
			$('#form-login').addClass('hideForm').removeClass('fadeIn');
		};
	})

	$('.two').on('click', function() {
		if ($('.one').hasClass('photo-logo')) {
			$('.one').removeClass('photo-logo').addClass('photo-login').removeClass('background-size-three').addClass('background-size-one');
		};
		if ($('#form-login').hasClass('fadeIn')) {
			$('#form-login').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('.three').hasClass('photo-logo')) {
			$('.three').removeClass('photo-logo').addClass('photo-info');
		};
		if ($('#info').hasClass('fadeIn')) {
			$('#info').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('#logo').hasClass('photo-login')) {
			$('#logo').removeClass('photo-login').addClass('photo-signup');
		};
		if ($('#logo').hasClass('photo-info')) {
			$('#logo').removeClass('photo-info').addClass('photo-signup').removeClass('background-size-four').addClass('background-size-logo');
		};
		if ($('.two').hasClass('photo-signup')) {
			$('.two').removeClass('photo-signup').removeClass('background-size-two').addClass('background-size-three').addClass('photo-logo');
			$('#logo').removeClass('photo-logo').addClass('photo-signup').removeClass('background-size-four').addClass('background-size-logo');
			$('#welcome').removeClass('fadeIn').addClass('hideForm');
			$('#signup').removeClass('hideForm').addClass('fadeIn');
			$('#new-profile-form').addClass('fadeIn').removeClass('hideForm');
		} else if ($('.two').hasClass('photo-logo')) {
			clicks++;
			$('.two').addClass('photo-signup').addClass('background-size-two').removeClass('background-size-three').removeClass('photo-logo');
			$('#logo').addClass('photo-logo').removeClass('photo-signup').removeClass('background-size-four').addClass('background-size-logo');
			$('#welcome').addClass('fadeIn').removeClass('hideForm');
			$('#signup').addClass('hideForm').removeClass('fadeIn');
			$('#new-profile-form').removeClass('fadeIn').addClass('hideForm');
		};
	});

	$('.three').on('click', function() {
		if ($('.two').hasClass('photo-logo')) {
			$('.two').removeClass('photo-logo').addClass('photo-signup').removeClass('background-size-three').addClass('background-size-two');
		};
		if ($('#signup').hasClass('fadeIn')) {
			$('#signup').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('#new-profile-form').hasClass('fadeIn')) {
			$('#new-profile-form').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('.one').hasClass('photo-logo')) {
			$('.one').removeClass('photo-logo').addClass('photo-login').removeClass('background-size-three').addClass('background-size-one');
		};
		if ($('#form-login').hasClass('fadeIn')) {
			$('#form-login').removeClass('fadeIn').addClass('hideForm');
		};
		if ($('#logo').hasClass('photo-login')) {
			$('#logo').removeClass('photo-login').addClass('photo-info').removeClass('background-size-four').addClass('background-size-logo');
		};
		if ($('#logo').hasClass('photo-signup')) {
			$('#logo').removeClass('photo-signup').addClass('photo-info');
		};
		if ($('.three').hasClass('photo-info')) {
			$('.three').removeClass('photo-info').addClass('photo-logo');
			$('.three').removeClass('photo-info').addClass('photo-logo');
			$('#logo').removeClass('photo-logo').addClass('photo-info').removeClass('background-size-four').addClass('background-size-logo');
			$('#welcome').removeClass('fadeIn').addClass('hideForm');
			$('#info').removeClass('hideForm').addClass('fadeIn');
		} else if ($('.three').hasClass('photo-logo')) {
			clicks++;
			$('.three').addClass('photo-info').removeClass('photo-logo');
			$('.three').addClass('photo-info').removeClass('photo-logo');
			$('#logo').addClass('photo-logo').removeClass('photo-info').removeClass('background-size-four').addClass('background-size-logo');
			$('#welcome').addClass('fadeIn').removeClass('hideForm');
			$('#info').addClass('hideForm').removeClass('fadeIn');
		};
	});
// NOT LOGGED IN DISPLAY














// SIMON SAYS GAME JS
	var Simon = {
		sequence: [],
		copy: [],
		round: 0,
		active: true,
		mode: 'normal',

	
		init: function() {
			var that = this;
			$('[data-action=start]').on('click', function() {
				that.startGame();
			});
			$('input[name=mode]').on('change', function(e) {
				that.changeMode(e);
			});
		},

		startGame: function() {
			this.sequence = [];
			this.copy = [];
			this.round = 0;
			this.active = true;
			$('p[data-action="lose"]').hide();
			this.newRound();
		},

		// add a new color to the sequence and animate it to the user
		newRound: function() {
			$('[data-round]').text(++this.round);
			this.sequence.push(this.randomNumber());
			this.copy = this.sequence.slice(0);
			this.animate(this.sequence);
		},

		// the game is controlled primarily through this function, along with checkLose().
		// Since the player can never actually "win", we just listen for clicks as the user 
		// plays the sequence and each time, check if they lost
		registerClick: function(e) {
			var desiredResponse = this.copy.shift();
			var actualResponse = $(e.target).data('tile');
			this.active = (desiredResponse === actualResponse);
			this.checkLose();
		},

		// three possible situations:
		// 1. The user clicked the wrong color (end the game)
		// 2. The user entered the right color, but is not finished with the sequence (do nothing)
		// 3. The user entered the right color and just completed the sequence (start a new round)
		checkLose: function() {
			// copy array will be empty when user has successfully completed sequence
			if (this.copy.length === 0 && this.active) {
				this.deactivateSimonBoard();
				this.newRound();

			} else if (!this.active) { // user lost
				this.deactivateSimonBoard();
				this.endGame();
			}
		},

		endGame: function() {
			// notify the user that they lost and change the "round" text to zero
			$('p[data-action=lose]').show();
			$($('[data-round]').get(0)).text('0');
		},

		changeMode: function(e) {
			this.mode = e.target.value;
		},

		/*----------------- Helper functions -------------------*/

		// allow user to interact with the game
		activateSimonBoard: function() {
			var that = this;
			$('.simon')
				.on('click', '[data-tile]', function(e) {
					that.registerClick(e);
				})

				.on('mousedown', '[data-tile]', function() {
					$(this).addClass('active');
					that.playSound($(this).data('tile'));
				})

				.on('mouseup', '[data-tile]', function() {
					$(this).removeClass('active');
				});

			$('[data-tile]').addClass('hoverable');
		},

		// prevent user from interacting until sequence is done animating
		deactivateSimonBoard: function() {
			if (this.mode !== 'free-board') {
				$('.simon')
					.off('click', '[data-tile]')
					.off('mousedown', '[data-tile]')
					.off('mouseup', '[data-tile]');

				$('[data-tile]').removeClass('hoverable');
			}
		},

		animate: function(sequence) {
			var i = 0;
			var that = this;
			var interval = setInterval(function() {
				that.playSound(sequence[i]);
				that.lightUp(sequence[i]);

				i++;
				if (i >= sequence.length) {
					clearInterval(interval);
					that.activateSimonBoard();
				}
			}, 600);
		},

		lightUp: function(tile) {
			if (this.mode !== 'sound-only') {
				var $tile = $('[data-tile=' + tile + ']').addClass('lit');
				window.setTimeout(function() {
					$tile.removeClass('lit');
				}, 300);
			}

		},

		playSound: function(tile) {
			if (this.mode !== 'light-only') {
				var audio = $('<audio autoplay></audio>');
				audio.append('<source src="/sounds/ogg/sounds' + tile + '.ogg" type="audio/ogg" />');
				audio.append('<source src="/sounds/mp3/sounds' + tile + '.mp3" type="audio/mp3" />');
				$('[data-action=sound]').html(audio);
			}
		},

		randomNumber: function() {
			// between 1 and 4
			return Math.floor((Math.random()*4)+1);
		}
	};

	return Simon;
});





