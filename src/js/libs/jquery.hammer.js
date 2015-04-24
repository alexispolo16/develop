(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'hammer'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'), require('hammer'));
	} else {
		factory(jQuery, Hammer);
	}
}(function($, Hammer) {

	var coordinates = [],
		threshold = 25,
		timeout = 2500;

	// add hammer as global
	window.Hammer = Hammer;

	// creates hammer object
	function hammerify(el, options) {
		var $el = $(el),h;
		if(!$el.data("hammer")) {
			h = Hammer($el[0], options);
			$el.data("hammer", h );
		}
	};

	// updates options to hammer objects
	function getHammered(el, gesture, options ) {
		var $el = $(el).data("hammer");
		if($el) {
			gesture = $el.get(gesture);
			if ( gesture ){
				gesture.set( options );
			}
		}
	};

	// $jqueryElement.hammer(options).on()
	$.fn.hammer = function(options) {
		return this.each(function() {
			hammerify(this, options);
		});
	};

	// $jqueryElement.setHammer(gesture, options)
	$.fn.setHammer = function(gesture, options) {
		return this.each(function() {
			getHammered(this, gesture, options);
		});
	};

	// $jqueryElement.preventGhostClick()
	$.fn.preventGhostClick = function () {
		if ( ! ( "ontouchstart" in window ) ) {
			return;
		}
		return this.each(function() {
			this.addEventListener("touchstart", resetCoordinates, true);
			this.addEventListener("touchend", registerCoordinates, true);
		});
	};

	// Prevents ghost clicks within range
	function preventGhostClick (ev) {
		for (var i = 0; i < coordinates.length; i++) {
			var x = coordinates[i][0];
			var y = coordinates[i][1];
 
			// I ain't afraid of no ghost
			if (Math.abs(ev.clientX - x) < threshold && Math.abs(ev.clientY - y) < threshold) {
				ev.stopPropagation();
				ev.preventDefault();
				break;
			}
		}
	};

	// Reset coordinates array
	function resetCoordinates () {
		coordinates = [];
	};

	// Pop coordinates array
	function popCoordinates () {
		coordinates.splice(0,1);
	};

	function registerCoordinates (ev) {
		// touchend is triggered on every releasing finger
		// changed touches always contain the removed touches on a touchend
		// the touches object might contain these also at some browsers (firefox os)
		// so touches - changedTouches will be 0 or lower, like -1, on the final touchend
		if(ev.touches.length - ev.changedTouches.length <= 0) {
			var touch = ev.changedTouches[0];
			coordinates.push([touch.clientX, touch.clientY]);
 
			setTimeout(popCoordinates, timeout);
		}
	};

	// Add preventGhostClick to document
	document.addEventListener("click", preventGhostClick, true);

	// extend the emit method to also trigger jQuery events
	Hammer.Manager.prototype.emit = (function(originalEmit) {
		return function(type, data) {
			// This avoids ghost clicks for taps that are not links
			if ( type === "tap" && $(data.target).closest("a").length === 0 ){
				data.srcEvent.preventDefault();
			}
			originalEmit.call(this, type, data);
			$(this.element).trigger({
				type: type,
				gesture: data
			});
		};
	})(Hammer.Manager.prototype.emit);

}));