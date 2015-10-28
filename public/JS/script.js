
$(document).ready(function(){







	// GET USER LOCATION
	if (navigator.geolocation) {
    	console.log('Geolocation is supported!');
  	} else {
    	console.log('Geolocation is not supported for this Browser/OS version yet.');
  	};

  	navigator.geolocation.watchPosition(function(position) {

    	var lat = position.coords.latitude;
    	var lon = position.coords.longitude;
    	console.log(lat, lon);
    	var swlat = lat + 0.001;
    	var swlon = lon + 0.001;
    	var nelat = lat - 0.001;
    	var nelon = lon - 0.001;

    	function getLocations() {
	      	$.post('/api/yelp', userBarOptions, function (data) {

	      		var marker, i;
	      		var markers = new Array();

	      		for (var i=0; i < data.length; i++) {

	      			var infowindow = new google.maps.InfoWindow();

	      			var marker = new google.maps.Marker({
	      				position: {lat: data[i].location.coordinate.latitude, lng: data[i].location.coordinate.longitude },
	      				map: map,
	      				title: data[i].name
	      			});

	      			markers.push(marker);
	      			console.log(markers);

	      			google.maps.event.addListener(marker, 'click', (function(marker, i) {
    					return function() {
      						infowindow.setContent('<p id="marker-content">' + data[i].name + '</p>' + '<img id="marker-photos" src="' + data[i].image_url + '">');
      						infowindow.open(map, marker);
    					}
  					})(marker, i));
	      		};
	        });
		};

    	function initMap() {
			
			var myOptions = {
                zoom: 14,
                center: {lat: position.coords.latitude, lng: position.coords.longitude }
            };

            map = new google.maps.Map(document.getElementById('map'), myOptions);

  			var marker = new google.maps.Marker({
    			position: {lat: position.coords.latitude, lng: position.coords.longitude },
    			map: map,
    			title: 'Hello World!'
  			});
		};

    	console.log(swlat, swlon, nelat, nelon);

    	var userBarLocation = {term: 'bar', bounds: swlat + ',' + swlon + '|' + nelat + ',' + nelon };
    	var userBarOptions = {term: 'bar', bounds: swlat + ',' + swlon + '|' + nelat + ',' + nelon, limit: '3'};

    	$.post('/api/yelp', userBarLocation, function (data) {
    		$('#bar-location').html(data[0].name);
    	});

    	$('.options-five').on('click', function() {
    		$('#profile').hide();
    		$('#bar-location').hide();
    		$.post('api/yelp', userBarOptions, function (data) {
    			initMap();
    			getLocations();
    		});
    	});
    });
	// GET USER LOCATION 





	// CHECK COOKIES IF LOGGED IN
	function checkAuth() {
		$.get('/current-user', function (data) {
			if (data.user || data.cookie) {
				$('.not-logged-in').hide();
				$('.logged-in').removeClass().show();
			} else {
				$('.not-logged-in').show();
				$('.logged-in').hide();
			};
		});
	};

	checkAuth();
	// CHECK COOKIES IF LOGGED IN





	// SUBMIT FORM FOR SIGN UP
	$('#new-profile-form').on('submit', function(e) {
		e.preventDefault();
		var newUser = $(this).serialize();
		console.log(newUser);

		$.post('/api/users', newUser, function (data) {
			console.log(data);
			$('.not-logged-in').removeClass().addClass('hideForm');
			$('.logged-in').show();
		});
	});
	//SUBMIT FORM FOR SIGN UP






	// SUBMIT FORM FOR LOG IN
	$('#form-login').on('submit', function(e) {
		e.preventDefault();
		var newUser = $(this).serialize();

		$.post('/login', newUser, function (data) {
			checkAuth();
		});
	});
	// SUBMIT FORM FOR LOG IN







	// LOGOUT ON CLICK FUNCTION
	$('#logout').on('click', function() {
		$.get('/logout', function (data) {
			console.log(data.msg);
		});
	});
	// LOGOUT ON CLICK FUNCTION







// LOGGED IN DISPLAY
	$('.options-one').addClass('photo-messages');

	$('.options-two').addClass('photo-settings');

	$('.options-three').addClass('photo-logout');

	$('.options-four').addClass('photo-users');

	$('.options-five').addClass('photo-nearbys');

	$('#profile').addClass('photo-user');



	$('#users').on('click', function() {
		$('#profile').removeClass('photo-user').addClass('photo-users');
		$('.profile-options').addClass('shrink');
		$('.profile-options').one('webkitAnimationEnd', function() {
			$('.profile-options').removeClass('shrink').addClass('hideForm');
		})

	})










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
			$('#logo').addClass('simon-says');
			$('.options').addClass('hideForm').removeClass('fadeIn');
			$('#welcome').addClass('hideForm');
		};
	});

	$('#logo').on('click', function() {
		if ($('.options').hasClass('hideForm')) {
			$('#logo').addClass('shrink');
			$('#logo').one('webkitAnimationEnd', function() {
				$('#logo').removeClass().addClass('hideForm');
				$('.simonsays').removeClass('hideForm').addClass('grow');
				$('.game-info').removeClass('hideForm').addClass('fadeIn');
				Simon.init();
			});
		};
	});

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





