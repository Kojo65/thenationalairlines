jQuery(document).ready(function ($) {
	// Loader
	$(window).load(function () {
		setTimeout(function () {
			openAir()
			$('.loader').fadeOut('slow')
		}, 500)
	})
	
	//Modified On/By 2022-03-15 DamonLL:
	$(".wpcf7-spinner").remove();
  	$(".wpcf7-form-control-wrap").css("display", "block");

	function openAir() {
		setTimeout(() => {
			$('.intro').addClass('planeAnimate')
			setTimeout(() => {
				$('.intro').addClass('planeTransform')
			}, 2500)
		}, 500)
	}

	$('.intro-charter__tabs button').on('click', function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		$('.cargo-charters, .passenger, .acmi').removeClass('active')
		$('.' + id).addClass('active')
		$('.intro-charter__tabs button').removeClass('active')
		$(this).addClass('active')
	})

	// Header -> Mobile menu
	$('.toggleBtn').on('click', function () {
		$('.toggleBtn').toggleClass('open')
		$('.mobMenu').toggleClass('open')
	})

	// Animation
	function animationScroll() {
		var window_top_position = $(document).scrollTop()
		$('.anim').each(function () {
			var element_top_position = $(this).offset().top

			if (window_top_position > element_top_position - $(window).outerHeight()) {
				$(this).addClass('start')
				if ($(this).data('delay') !== undefined) {
					$(this).css('animation-delay', $(this).data('delay'))
				}
			}
		})
	}

	setTimeout(function () {
		animationScroll()
	}, 500)

	$(window).scroll(function () {
		animationScroll()
	})

	// Page / Block -> Slider
	const $next = $('.slider__controls .button-next')
	const $prev = $('.slider__controls .button-prev')
	$('.slider__wrapp').slick({
		lazyLoad: 'ondemand',
		arrows: true,
		dots: true,
		nextArrow: $next,
		prevArrow: $prev,
		infinite: true,
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	})

	$('.mob-slider').slick({
		arrows: false,
		dots: false,
		infinite: true,
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	})

	if (window.innerWidth > 576) {
		$('.cooperation__slider--wrapp').slick({
			lazyLoad: 'ondemand',
			arrows: false,
			dots: false,
			infinite: false,
			slidesToShow: 1,
			centerMode: false,
			centerPadding: '0px',
			focusOnSelect: true,
			variableWidth: true,
		})
	}

	// Map
	$('.map .map__points__point .map__points__point__text').hover(function(){
        $('.map .map__points__point, .map__decore').addClass('inactive');
        $(this).closest('.map__points__point').removeClass('inactive').addClass('active');
    });
    $('.map .map__points__point').mouseleave(function(){
        $('.map .map__points__point').removeClass('inactive active');
        $('.map__decore').removeClass('inactive');
    });

	$('.map .map__points__point__info .copy-txt').click(function () {
		copyDivToClipboard($(this).parent().find('.copy-txt-cont')[0])
	})

	function copyDivToClipboard(el) {
		var range = document.createRange()
		range.selectNode(el)
		window.getSelection().removeAllRanges() // clear current selection
		window.getSelection().addRange(range) // to select text
		document.execCommand('copy')
		window.getSelection().removeAllRanges() // to deselect
	}

	// Menu scroll
	// var lastScrollTop = 0
	// $(window).scroll(function (event) {
	// 	var st = $(this).scrollTop()
	// 	if (st > lastScrollTop) {
	// 		$('.header').addClass('hide')
	// 	} else {
	// 		$('.header').removeClass('hide')
	// 	}
	// 	if (st <= 0) {
	// 		$('.header').removeClass('hide')
	// 	}
	// 	lastScrollTop = st
	// })

	// Contact form 7
	var wpcf7Elm = document.querySelectorAll('.tabs form');

	// Add clode button
	if (wpcf7Elm !== null) {
		wpcf7Elm.forEach((el) => {
			el.addEventListener(
				'wpcf7submit',
				function (event) {
					el.querySelector('.wpcf7-response-output').classList.remove('hide')
					setTimeout(function () {
						let outputText = el.querySelector('.wpcf7-response-output').innerHTML
						let svgClose =
							'<svg class="close" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9.63574" y="11.0503" width="2" height="16" transform="rotate(-45 9.63574 11.0503)" fill="white"/><rect x="20.9502" y="9.63599" width="2" height="16" transform="rotate(45 20.9502 9.63599)" fill="white"/></svg>'
							el.querySelector('.wpcf7-response-output').innerHTML = outputText + svgClose
					}, 200)
				},
				false,
			)
		});
	}

	// Close message
	$('.tabs form .wpcf7-response-output').on('click', '.close', function () {
		$(this).closest('.wpcf7-response-output').addClass('hide')

		return false
	})

	// Add arrow to submit button
    $( '.contacts__form form input[type="submit"]' ).after('<svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 0L19 6L9 12V7H0V5H9V0ZM11 3.53238L15.1127 6L11 8.46762V3.53238Z" fill="white"/><path d="M15.1127 6L11 3.53238V8.46762L15.1127 6Z" fill="white"/></svg>');

    // Form checkbox-submit
    $('.form').each(function(){
        if( !$(this).find('input[type="checkbox"]').is(':checked') ) {
            $(this).find('input[type="submit"]').prop('disabled', true);
        }

        $(this).find('input[type="checkbox"]').change(function(){
            if( $(this).is(':checked') ) {
                $(this).closest('form').find('input[type="submit"]').prop('disabled', false);
            } else {
                $(this).closest('form').find('input[type="submit"]').prop('disabled', true);
            }
        });
    });

	// FAQ Accordion
	$('.faq__tab-title').on('click', function () {
		$('.faq__tab-title').removeClass('active')
		$('.faq__tab-title')
			.not(this)
			.parent()
			.find('.faq__tab-text')
			.each(function () {
				$(this).get(0).style.maxHeight = null
			})
		let content = $(this).next().get(0)
		if (content.style.maxHeight) {
			content.style.maxHeight = null
		} else {
			content.style.maxHeight = content.scrollHeight + 'px'
			$(this).addClass('active')
		}
	})

	// Tabs tab
	$('.tab-title').click(function () {
		const target = $(this).data('tab')
		$('.tab-title').removeClass('active')
		$(this).addClass('active')

		$('.tab').removeClass('active')
		$('.tab[data-tabcont="' + target + '"]').addClass('active')
	})

	// Add arrow to submit button
	$('.tabs form input[type="submit"], .career__form form input[type="submit"]').after(
		'<svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 0L19 6L9 12V7H0V5H9V0ZM11 3.53238L15.1127 6L11 8.46762V3.53238Z" fill="white"/><path d="M15.1127 6L11 3.53238V8.46762L15.1127 6Z" fill="white"/></svg>',
	)

	$('.form-file input[type="file"]').each(function(){
		$(this).after('<span class="file-button empty">Choose file...</span>');
	});

	$('.form-file input[type="file"]').on('change', function(){
		if (this.files && this.files.length >= 1) {
			if( this.files[0].name !== undefined ) {
				$(this).next('.file-button').removeClass('empty');
				$(this).next('.file-button').text(this.files[0].name);
				$(this).closest('form').find('input[type="submit"]').prop('disabled', false);
			} else {
				$(this).next('.file-button').addClass('empty');
				$(this).next('.file-button').text('Choose file...');
				$(this).closest('form').find('input[type="submit"]').prop('disabled', true);
			}
		} else {
			$(this).next('.file-button').addClass('empty');
			$(this).next('.file-button').text('Choose file...');
			$(this).closest('form').find('input[type="submit"]').prop('disabled', true);
		}
	});
	// end
})

// fleet airplane
document.addEventListener('DOMContentLoaded', function () {
	var openNoseDiv = document.querySelector('.open-nose')
	var openNoseTipDiv = document.querySelector('.open-nose-tip')
	var pElement = openNoseDiv.querySelector('p')
	var closedNoseDiv = document.querySelector('.closed-nose')
	var openedNoseDiv = document.querySelector('.opened-nose')

	openNoseDiv.addEventListener('click', function () {
		openNoseTipDiv.classList.toggle('is_opened')

		if (openNoseTipDiv.classList.contains('is_opened')) {
			pElement.textContent = 'Click to close the nose'
			openedNoseDiv.classList.add('is_active')
			closedNoseDiv.classList.remove('is_active')
		} else {
			pElement.textContent = 'Click to open the nose'
			closedNoseDiv.classList.add('is_active')
			openedNoseDiv.classList.remove('is_active')
		}
	})
})

const initVideoButtons = () => {
	const buttons = [...document.querySelectorAll('.video-button')]
	if (!buttons) return

	buttons.forEach((btn) => {
		const iframe = btn.parentElement.querySelector('iframe')
		if (!iframe) return

		btn.addEventListener('click', () => {
			const src = iframe.getAttribute('src')
			const index = src.indexOf('autoplay')

			console.log(src, src.indexOf('autoplay'))
			if (index === -1) {
				if (src.indexOf('?') === -1) {
					iframe.setAttribute('src', `${src}?autoplay=1`)
				} else {
					iframe.setAttribute('src', `${src}&autoplay=1`)
				}

				document.dispatchEvent(
					new CustomEvent('playVideo', {
						detail: {
							action: 'play',
							button: btn,
							iframe: iframe,
						},
					}),
				)
			} else {
				const searching = src.substring(index, index + 10)
				if (searching.indexOf('1') !== -1) {
					document.dispatchEvent(
						new CustomEvent('pauseVideo', {
							detail: {
								action: 'pause',
								button: btn,
								iframe: iframe,
							},
						}),
					)
				} else if (searching.indexOf('0') !== -1) {
					document.dispatchEvent(
						new CustomEvent('playVideo', {
							detail: {
								action: 'play',
								button: btn,
								iframe: iframe,
							},
						}),
					)
				}

				const argument = searching.indexOf('1') === -1 ? '1' : '0'
				const target = `${src.substring(index, index + 9)}${argument}`
				const replacement = src.replace(searching, target)

				iframe.setAttribute('src', `${replacement}`)
			}
		})
	})
}

const videoToggledState = (event) => {
	const { action, button, iframe } = event.detail

	button.classList.toggle('hide-overlay', action.includes('play'))
}

document.addEventListener('playVideo', videoToggledState, { passive: true })
document.addEventListener('pauseVideo', videoToggledState, { passive: true })

// Lazy load
document.addEventListener('DOMContentLoaded', function () {
	var lazyloadImages = document.querySelectorAll('img.lazy')
	var lazyloadThrottleTimeout

	function lazyload() {
		if (lazyloadThrottleTimeout) {
			clearTimeout(lazyloadThrottleTimeout)
		}

		lazyloadThrottleTimeout = setTimeout(function () {
			var scrollTop = window.pageYOffset
			lazyloadImages.forEach(function (img) {
				if (img.offsetTop < window.innerHeight + scrollTop) {
					img.src = img.dataset.src
					img.classList.remove('lazy')
				}
			})
			if (lazyloadImages.length == 0) {
				document.removeEventListener('scroll', lazyload)
				window.removeEventListener('resize', lazyload)
				window.removeEventListener('orientationChange', lazyload)
			}
		}, 20)
	}

	lazyload()

	document.addEventListener('scroll', lazyload)
	window.addEventListener('resize', lazyload)
	window.addEventListener('orientationChange', lazyload)

	initVideoButtons()
})