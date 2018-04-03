(function ($) {

	$('.zoom').zoom();
	// This button will increment the value
	$('.qtyplus').on('click', function(e) {
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		fieldName = $(this).attr('for');
		// Get its current value
		var currentVal = parseInt($('input[id='+fieldName+']').val());
		// If is not undefined
		if (!isNaN(currentVal)) {
			// Increment
			$('input[id='+fieldName+']').val(currentVal + 1);
		} else {
			// Otherwise put a 0 there
			$('input[id='+fieldName+']').val(0);
		}
	});
	// This button will decrement the value till 0
	$('.qtyminus').on('click', function(e) {
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		fieldName = $(this).attr('for');
		// Get its current value
		var currentVal = parseInt($('input[id='+fieldName+']').val());
		// If it isn't undefined or its greater than 0
		if (!isNaN(currentVal) && currentVal > 0) {
			// Decrement one
			$('input[id='+fieldName+']').val(currentVal - 1);
		} else {
			// Otherwise put a 0 there
			$('input[id='+fieldName+']').val(0);
		}
	});


	$.fn.magnifierRentgen = function() {

		return this.each(function() {

			var th        = $(this),
			dataImage     = th.data("image"),
			dataImageZoom = th.data("image-zoom"),
			dataSize      = th.data("size");

			th
			.addClass("magnifierRentgen")
			.on('resize', function() {
				th.find(".data-image, .magnifier-loupe img").css({
					"width" : th.width()
				})
			})
			.append("<img class='data-image' src='" + dataImage + "'><div class='magnifier-loupe'><img src='" + dataImageZoom + "'>")
				.hover(function() {
					th.find(".magnifier-loupe").stop().fadeIn()
				}, function() {
					th.find(".magnifier-loupe").stop().fadeOut()
				})
				.find(".data-image").css({
					"width" : th.width()
				}).parent().find(".magnifier-loupe").css({
						"width"  : dataSize,
						"height" : dataSize
					})
					.find("img").css({
						"position" : "absolute",
						"width"    : th.width()
					});

			th.mousemove(function(e) {

				var elemPos = {},
					offset  = th.offset();

				elemPos = {
					left : e.pageX - offset.left - dataSize/2,
					top  : e.pageY - offset.top - dataSize/2
				}
				th
				.find(".magnifier-loupe").css({
						"top"  : elemPos["top"],
						"left" : elemPos["left"]
					})
					.find("img").css({
						"top"   : -elemPos["top"],
						"left"  : -elemPos["left"],
						"width" : th.width()
					})
			});
			$(window).on('resize', function() {
				$(".magnifierRentgen").resize();
			});
		});
	};
	$(".divwrap").magnifierRentgen();

}(jQuery));