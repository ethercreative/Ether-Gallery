/**
 * Gallery Plugin for jQuery
 *
 * by Ether Creative
 */
;(function ( $, window, document, undefined ) {

	"use strict";

	var pluginName = "etherGallery",
		defaults = {
			keys: true,
			swipe: true
		};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			var t = this,
				body = $('body');

			// Overlay
			t.overlay = $('.egal-overlay');
			if (t.overlay.length < 1) {
				t.overlay = $('<div class="egal-overlay" />').click(function () {
					t.closeGallery(t);
				});
				body.append(t.overlay);
			}

			// Gallery UL
			t.ul = $('.egal-ul');
			if (t.ul.length < 1) {
				t.ul = $('<ul class="egal-ul" />');
				body.append(t.ul);
			}

			var imageLinks = $(this.element).find('a[data-gallery]');

			imageLinks.click(function (e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				t.openGallery(t, this);
			});

			// Keyboard
			t.keyListener = function (e) {
				if (e.keyCode === 39) {
					t.ul.find('.egal-next').click();
				} else if (e.keyCode === 37) {
					t.ul.find('.egal-prev').click();
				} else if (e.keyCode === 27) {
					t.closeGallery(t);
				}
			};

			// Swipe
			var xDown = null,
				yDown = null;
			t.handleTouchStart = function (evt) {
				xDown = evt.touches[0].clientX;
				yDown = evt.touches[0].clientY;
			};
			t.handleTouchMove = function (evt) {
				if ( ! xDown || ! yDown ) {
					return;
				}

				var xUp = evt.touches[0].clientX;
				var yUp = evt.touches[0].clientY;

				var xDiff = xDown - xUp;
				var yDiff = yDown - yUp;

				if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
					if ( xDiff > 0 ) {
						t.ul.find('.egal-next').click();
					} else {
						t.ul.find('.egal-prev').click();
					}
				} else {
					if ( yDiff > 0 ) {
						//up
					} else {
						//down
					}
				}
				//reset
				xDown = null;
				yDown = null;
			};
		},
		openGallery: function (t, el) {
			var galleryName = $(el).data('gallery'),
				galleryFirstImage = $(el).attr('href'),
				galleryAnchors = $(t.element).find('a[data-gallery=' + galleryName + ']');

			t.ul.html('');

			galleryAnchors.each(function () {
				t.ul.append('<li data-image="' + $(this).attr('href') + '"><div><img src="" alt="' + ($(this).attr('title') || '') + '" /></div></li>');
			});

			var firstImage = t.ul.find('li[data-image="' + galleryFirstImage + '"]'),
				prevImage = firstImage.prev(),
				nextImage = firstImage.next();
			firstImage.addClass('egal-active').find('img').attr('src', firstImage.data('image'));
			prevImage.addClass('egal-prev').find('img').attr('src', prevImage.data('image'));
			nextImage.addClass('egal-next').find('img').attr('src', nextImage.data('image'));

			nextImage.nextAll().addClass('egal-after-next');

			// Fade in on image load
			t.ul.find('li').find('img').on('load', function () {
				$(this).parent().css('opacity', 1);
			});

			function clicker(th) {
				var newPrev = $(th).prev(),
					newNext = $(th).next();

				t.ul.find('li')
					.removeClass('egal-active')
					.removeClass('egal-next')
					.removeClass('egal-prev')
					.removeClass('egal-after-next');

				newPrev.addClass('egal-prev').find('img').attr('src', newPrev.data('image'));
				newNext.addClass('egal-next').find('img').attr('src', newNext.data('image'));

				$(th).addClass('egal-active').off('click');

				newPrev.off('click').click(function () {
					clicker(this);
				});
				newNext.off('click').click(function () {
					clicker(this);
				});

				newNext.nextAll().addClass('egal-after-next');
			}

			prevImage.click(function () {
				clicker(this);
			});

			nextImage.click(function () {
				clicker(this);
			});

			// Keyboard Controls
			if (t.settings.keys) {
				document.addEventListener('keydown', t.keyListener, true);
			}

			// Swipe Controls
			if (t.settings.swipe) {
				document.addEventListener('touchstart', t.handleTouchStart, false);
				document.addEventListener('touchmove', t.handleTouchMove, false);
			}

			$('body').addClass('egal-open');
		},
		closeGallery: function (t) {
			document.removeEventListener('keydown', t.keyListener, true);
			document.removeEventListener('touchstart', t.handleTouchStart, false);
			document.removeEventListener('touchmove', t.handleTouchMove, false);
			$('body').removeClass('egal-open');
		}
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );