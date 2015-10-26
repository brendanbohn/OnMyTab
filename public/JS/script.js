$(document).ready(function(){

	$('#logo').addClass('grow').addClass('photo-logo').addClass('background-size-logo');

	$('#welcome').addClass('fadeIn');

	$('.options').addClass('hideForm');

	$('.one').addClass('photo-login').addClass('background-size-one');

	$('.two').addClass('photo-signup').addClass('background-size-two');

	$('.three').addClass('photo-info').addClass('background-size-three');

	$('#new-profile-form').addClass('hideForm');

	$('#signup').addClass('hideForm');

	$('#info').addClass('hideForm');

	$('#form-login').addClass('hideForm');

	$('#logo').hover(function() {
		$('.options').removeClass('hideForm').addClass('fadeIn');
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
			$('.three').addClass('photo-info').removeClass('photo-logo');
			$('.three').addClass('photo-info').removeClass('photo-logo');
			$('#logo').addClass('photo-logo').removeClass('photo-info').removeClass('background-size-four').addClass('background-size-logo');
			$('#welcome').addClass('fadeIn').removeClass('hideForm');
			$('#info').addClass('hideForm').removeClass('fadeIn');
		};
	});





	// $('.two').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	// 	$('.two').removeClass('fadeOut').addClass('image-logo').addClass('fadeIn');
	// 	// $('#begin').addClass('image-new-user').addClass('fadeIn').addClass('background-white');
	// });


	// $('#signUpButton').on('click', function(e) {
	// 	e.preventDefault();
	// 	$('#begin').removeClass('grow').addClass('shrink');
	// 	$('#welcome').removeClass('fadeIn').addClass('fadeOut');
	// 	$('#begin').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	// 		$('#begin').addClass('hideForm');
	// 		$('.uploadPhoto').append("<p class='uploader-new-button center-block' id='uploaderPhoto'><input type='hidden' name='picture' role='uploadcare-uploader'></p>");
	// 		$('#uploaderPhoto').addClass('hideForm');
	// 		$('#userPhoto').removeClass('hideForm').addClass('grow');
	// 		$('#new-profile-form').removeClass('hideForm').addClass('fadeIn');
	// 	});	
	// 	$('#welcome').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	// 		$('#welcome').removeClass('fadeIn').addClass('hideForm');
	// 	});
	// 	$('#userPhoto').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	// 		$('#uploaderPhoto').removeClass('hideForm').addClass('fadeIn');
	// 	});
	// });











	$('#new-profile-form').on('submit', function(e) {
		e.preventDefault();
		var newUser = $(this).serialize();
		console.log(newUser);

		$.post('/api/user', newUser, function(response) {
			var newUser = response;
		});

		window.location = 'http://localhost:3000/home';
		
	});

});

// red, pink, yellow, blue, purple, green, orange, white


