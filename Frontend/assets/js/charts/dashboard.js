if (document.querySelectorAll('.d-slider1').length > 0) {
	const options = {
		centeredSlides: false,
		loop: false,
		slidesPerView: 4,
		autoplay: false,
		spaceBetween: 32,
		breakpoints: {
			320: { slidesPerView: 1 },
			550: { slidesPerView: 2 },
			991: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
			1500: { slidesPerView: 4 },
			1920: { slidesPerView: 6 },
			2040: { slidesPerView: 7 },
			2440: { slidesPerView: 8 }
		},
		pagination: {
			el: '.swiper-pagination'
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar'
		}
	};
	let swiper = new Swiper('.d-slider1', options);

	document.addEventListener('ChangeMode', (e) => {
		if (e.detail.rtl === 'rtl' || e.detail.rtl === 'ltr') {
			swiper.destroy(true, true);
			setTimeout(() => {
				swiper = new Swiper('.d-slider1', options);
			}, 500);
		}
	});
}
