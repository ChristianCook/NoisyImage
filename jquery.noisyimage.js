/* jquery.noisyimage - v1.0 - Christian Cook - MIT
https://github.com/ChristianCook/NoisyImage - 14.12.2013 */

(function( $ ) {
var
	isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
	isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
	cssAdded = false;

	$.fn.noisyImage = function( options ) {
		var noiseImg;
		options = $.extend({}, $.fn.noisyImage.defaults, options);


		if (!cssAdded) {
			addRule('.jqueryNoisyImage', {
				'position': 'relative',
				'overflow': 'hidden',
				'line-height': 0
			});

			addRule('.jqueryNoisyImage IMG', {
				'position': 'static !important',
				'float': 'none !important'
			});

			addRule('.jqueryNoisyImage .noise', {
				position: 'relative',
				display: 'block',
				left: '-200%',
				top: '-200%',
				width: '500%',
				height: '500%'
			});

			if (isChrome || isSafari) {
				addRule('@-webkit-keyframes noise', '0%,100%{-webkit-transform:translate(0, 0);transform:translate(0, 0)}10%{-webkit-transform:translate(-5%, -10%);transform:translate(-5%, -10%)}20%{-webkit-transform:translate(-15%, 5%);transform:translate(-15%, 5%)}30%{-webkit-transform:translate(7%, -25%);transform:translate(7%, -25%)}40%{-webkit-transform:translate(21%, 20%);transform:translate(21%, 20%)}50%{-webkit-transform:translate(-25%, 10%);transform:translate(-25%, 10%)}60%{-webkit-transform:translate(15%, 0%);transform:translate(15%, 0%)}70%{-webkit-transform:translate(0%, 15%);transform:translate(0%, 15%)}80%{-webkit-transform:translate(25%, 19%);transform:translate(25%, 19%)}90%{-webkit-transform:translate(-10%, 10%);transform:translate(-10%, 10%)}');
			} else {
				addRule('@keyframes noise', '0%,100%{transform:translate(1%, 1%) }10%{transform:translate(-5%, -10%) }20%{transform:translate(-15%, 5%) }30%{transform:translate(7%, -25%) }40%{transform:translate(19%, 20%) }50%{transform:translate(-25%, 10%) }60%{transform:translate(15%, 1%) }70%{transform:translate(1%, 15%) }80%{transform:translate(25%, 20%) }90%{transform:translate(-10%, 10%) }');
			}
			cssAdded = true;
		}

		if (options.image) {
			options.fallback = options.image;
			options.forceFallback = true;
		}
		noiseImg = 'url(' + options.fallback + ')';

		return this.each(function() {
			var first  = !$(this).parent().hasClass('jqueryNoisyImage');
			if (first) $(this).wrap('<div></div>').after('<div class="noise"></div>');

			var img = $(this);
			var tag = $(this)[0].tagName;
			var wrapper = $(this).parent();
			var noise = wrapper.find('.noise');

			if ($.fn.noisy && !options.forceFallback) {
				if (!first) noise.css('background-image', '');
				noise.noisy( options );
			}	else noise.css({
				'background-image': noiseImg,
				'opacity': options.opacity
			});

			noise.css({
				'background-size': options.size*options.scale+'px '+options.size*options.scale+'px',
				'-moz-animation': options.speed+'s steps(5, end) 0s normal none infinite noise',
				'-webkit-animation': options.speed+'s steps(5, end) 0s normal none infinite noise',
				'-ms-animation': options.speed+'s steps(5, end) 0s normal none infinite noise',
				'-o-animation': options.speed+'s steps(5, end) 0s normal none infinite noise',
				'animation': options.speed+'s steps(5, end) 0s normal none infinite noise'
			});

			if (tag == 'IMG') {
				if ($(this).attr('alt')) wrapper.attr('title', $(this).attr('alt'));
				if ($(this).css('float') != 'none') wrapper.css('float', $(this).css('float'));
			}
			var styles = {
				position: $(this).css('position'),
				width: $(this).width(),
				height: $(this).height(),
				marginTop: $(this).css('marginTop'),
				marginRight: $(this).css('marginRight'),
				marginBottom: $(this).css('marginBottom'),
				marginLeft: $(this).css('marginLeft'),
				display: $(this).css('display') == 'inline' ? 'inline-block' : $(this).css('display'),
				'float': $(this).css('float')
			};

			if ($(this).css('position') != 'static') {
				$(this).css('position', 'static');
				$.extend(styles, {
					top: $(this).css('top'),
					right: $(this).css('right'),
					bottom: $(this).css('bottom'),
					left: $(this).css('left')
				});
			}

			$(this).css({ margin: 0 });
			if (first) {
				wrapper.addClass('jqueryNoisyImage').css(styles);
			}
		});
	};

	// Utility function
	function addRule(selector, styles, sheet) {
		styles = (function (styles) {
			if (typeof styles === "string") return styles;
				var clone = "";
				for (var p in styles) {
        	if (styles.hasOwnProperty(p)) {
          	var val = styles[p];
            p = p.replace(/([A-Z])/g, "-$1").toLowerCase();
            clone += p + ":" + (p === "content" ? '"' + val + '"' : val) + "; ";
          }
        }
      return clone;
    }(styles));

		if (document.styleSheets.length == 0 && !sheet) {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode("")); // webkit hack
			document.head.appendChild(style);
			sheet = style.sheet;
		} else sheet = sheet || document.styleSheets[document.styleSheets.length - 1];

		if (sheet.insertRule) sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
		else if (sheet.addRule) sheet.addRule(selector, styles);
	};

	// Default config
	$.fn.noisyImage.defaults = {
		opacity: 0.2,
		scale: 1.2,
		speed: 5,
		// jQuery.noisy
		intensity: 0.8,
		size: 250,
		monochrome: true,
		randomColors: true,
		fallback: 'noise.png',
		forceFallback: false,
		disableCache: false
	};
}( jQuery ));
