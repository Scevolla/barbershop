(function() {

// Popup Login form
////////////////////////////////////////////

var loginLink 				= document.querySelector('#login-link-id'),
	 popupLogin 			= document.querySelector('#popup-login-id'),
	 popupLoginClose 		= popupLogin.querySelector('#popup-login-close-id'),
	 popupLoginForm		= popupLogin.querySelector('.login-form'),
	 popupLoginUser 		= popupLogin.querySelector('input[name="login"]'),
	 popupLoginPassword 	= popupLogin.querySelector('input[name="password"]'),
	 viewportOverlay 		= document.querySelector('#viewport-overlay-id'),
	 usernameStorage		= localStorage.getItem('username');

loginLink.addEventListener('click', function(event) {
	event.preventDefault();
	viewportOverlay.classList.add('viewport-overlay-show');
	popupLogin.classList.add('popup-login-display');
	popupLogin.classList.add('popup-login-show');

	if (usernameStorage) {
		popupLoginUser.value = usernameStorage;
		popupLoginPassword.focus();
	}
	else {
		popupLoginUser.focus();
	}
});

popupLoginForm.addEventListener('submit', function(event) {
	popupLogin.classList.remove('popup-login-show');
	if (!popupLoginUser.value || !popupLoginPassword.value) {
		event.preventDefault();
		popupLogin.classList.add('popup-login-error');
		if (!popupLoginUser.value)
			popupLoginUser.focus();
		else if (!popupLoginPassword.value) {
			popupLoginPassword.focus();
		}
		setTimeout(function() {
			popupLogin.classList.remove('popup-login-error');
		}, 500);
	}
	else {
		localStorage.setItem('username', popupLoginUser.value);
		closeLoginPopup();
	}
});

popupLoginClose.addEventListener('click', function() {
	closeLoginPopup();
});

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (popupLogin.classList.contains('popup-login-show')) 
			closeLoginPopup();
	} 

	if (event.keyCode === 81) {
		viewportOverlay.classList.toggle('viewport-overlay-show2');
	} 
});

function closeLoginPopup() {
	viewportOverlay.classList.remove('viewport-overlay-show');
	popupLogin.classList.remove('popup-login-display');
	popupLogin.classList.remove('popup-login-show');
	popupLogin.classList.remove('popup-login-error');
}

// Popup interactive google map
/////////////////////////////////

var popupMap 				= document.querySelector('#popup-map-id'),
	 popupMapClose 		= popupMap.querySelector('#popup-map-close-id'),
	 footerMapLink 		= document.querySelector('#footer-map-link-id'),
	 indexContentMapLink = document.querySelector('#index-content-map-link-id');

footerMapLink.addEventListener('click', showPopupMap);
if (indexContentMapLink)
	indexContentMapLink.addEventListener('click', showPopupMap);

function showPopupMap(event) {
	event.preventDefault();
	viewportOverlay.classList.add('viewport-overlay-show');
	popupMap.style.display = 'block';
};

popupMapClose.addEventListener('click', function() {
	viewportOverlay.classList.remove('viewport-overlay-show');
	popupMap.style.display = 'none';	
});

// Photo gallery on Product page
/////////////////////////////////

var productThumbs = document.querySelectorAll('#product-thumbs-id a');
	 productImg 	= document.querySelector('#product-img-id');

if (productThumbs) {
	for (var i = 0; i < productThumbs.length; ++i) {
		productThumbs[i].addEventListener('click', function(event) {
			event.preventDefault();
			var srcImg = this.firstChild.getAttribute('src').replace('-thumb', '');
			productImg.setAttribute('src', srcImg);
		});
	}
}

// Photo gallery on Index page
///////////////////////////////////////////

var btnNext 		= document.querySelector('#index-next-btn-id');
	 btnPrev 		= document.querySelector('#index-prev-btn-id');
	 galleryImg 	= document.querySelector('#index-gallery-photo-id');
	 photoCount 	= 3;
	 curPhotoIndex = 1;

if (btnNext && btnPrev && galleryImg) {
	toggleGalleryBtns();
	
	btnNext.addEventListener('click', function() {
		if (curPhotoIndex < photoCount) {
			++curPhotoIndex;
			var srcStr = galleryImg.getAttribute('src')
				.replace('photo-' + (curPhotoIndex - 1), 'photo-' + curPhotoIndex);
			galleryImg.setAttribute('src', srcStr);
		}
		toggleGalleryBtns();
	});
	
	btnPrev.addEventListener('click', function() {
		if (curPhotoIndex > 1) {
			--curPhotoIndex;
			var srcStr = galleryImg.getAttribute('src')
				.replace('photo-' + (curPhotoIndex + 1), 'photo-' + curPhotoIndex);
			galleryImg.setAttribute('src', srcStr);
		}
		toggleGalleryBtns();
	});	
}

function toggleGalleryBtns() {
	if (curPhotoIndex >= photoCount) {
		btnNext.setAttribute("disabled", "disabled");
	}
	else {
		btnNext.removeAttribute("disabled");
	}
	if (curPhotoIndex <= 1) {
		btnPrev.setAttribute("disabled", "disabled");
	} 
	else {
		btnPrev.removeAttribute("disabled");
	}
}

// Pagination on Shop page
//////////////////////////////////////////////

var shopPageBtns = document.querySelectorAll('.shop-pagination-btn');

if (shopPageBtns) {
	for (var i = 0; i < shopPageBtns.length; ++i) {
		shopPageBtns[i].addEventListener('click', function(event) {
			event.preventDefault();
			for (var j = 0; j < shopPageBtns.length; ++j) {
				if (shopPageBtns[j].classList.contains('active')) {
					shopPageBtns[j].classList.remove('active');
					shopPageBtns[j].setAttribute('href', '#');
				}
			}
			this.classList.add('active');
			this.removeAttribute("href");
		});
	}
}


}());