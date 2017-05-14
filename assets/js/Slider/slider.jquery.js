if (typeof jQuery == "function") {
//jQuery.noConflict();
//(function($) { 
 $(function(){



$.fn.extend({
	// http://jsfiddle.net/swed/4exyen18/
	"class": function(){
		return $(this).attr("class") || $(this).selector.toString().replace(/^.*[\s]+([^\s])/, "$1").replace(/(^[^\.]+\.|[:][^\s]+)/, "").split(".").join(" ").trim();
	},
	"slider": function(p){
		p = $.extend({}, {
			"animationSpeed": 350,
			"autoSlideChange": 5000,
			"wrapper": ".wrapper",
			"slide": ".slide",
			"numbers": ".numbers",
			"arrow": ".arrow",
			"active": 0
		}, p);
		return $(this).each(function(){
			var _t = this;
			_t.debug = {};
			_t.p = p;
			var o = $(this);
			var sl = typeof t === "object" ? $(_t.p.slide) : $(_t.p.slide, o);
			if (sl.length <= 1) return $(_t);
			var w = typeof t === "object" ? $(_t.p.wrapper) : $(_t.p.wrapper, o);
			if (!w.length) w = sl.wrapAll("<div></div>").parent().addClass(w.class());
			if (sl.length == 2) { // double for correct view
				sl.clone().appendTo(w);
				sl = $(">*", w);
			}
			//  _t.debug.sl = sl;
			var ar = _t.p.arrow && (typeof t === "object" ? $(_t.p.arrow) : $(_t.p.arrow, o));
			if (ar && !ar.length) {
				ar = $("<a href='#' class='left'></a><a href='#' class='right'></a>").addClass(ar.class());
				o.append(ar);
			}
			var no = _t.p.numbers && typeof t === "object" ? $(_t.p.numbers) : $(_t.p.numbers, o);
			if (no && !no.length) {
				no = $("<div></div>").addClass(no.class());
				o.append(no);
			}
			sl.each(function(i){
				no.append("<a href='#'>" + (i + 1) + "</a>");
			});
			var setNactive = function(n){
				$("a", no).removeClass("active");
				$("a:eq(" + n + ")", no).addClass("active");
			};
			var changeSlide = function(n, direction){
				if (!_t.active || !_t.active.length || _t.active.is(":animated") || _t.active.index() === n) return;
				var l_left = _t.left.prev();
				if (!l_left.length) l_left = sl.last();
				var r_right = _t.right.next();
				if (!r_right.length) r_right = sl.first();
				if (!direction) {
					direction = -1;
					if (n !== false && (_t.active.index() > n || _t.active.index() == sl.length - 1)) direction = 1;
					if (Math.abs(_t.active.index() - n) > sl.length / 2) direction = -1 * direction;
				}
				// _t.debug.direction = direction;
				// _t.debug.n = n;
				if (direction > 0) {
					_t.right.removeClass("right");
					_t.left.addClass("active").removeClass("left");
					_t.right = _t.active.removeClass("active").addClass("right");
					_t.active = _t.left;
					_t.left = l_left.addClass("left");
				} else {
					_t.left.removeClass("left");
					_t.right.removeClass("right").addClass("active");
					_t.left = _t.active.removeClass("active").addClass("left");
					_t.active = _t.right;
					_t.right = r_right.addClass("right");
				}
				setNactive(_t.active.index());
				if (n !== false && _t.active.index() != n) {
					_t.active.animate({
						opacity: 1
					}, _t.p.animationSpeed, function(){
						changeSlide(n, direction);
						$(this).css("opacity", "");
					});
				}
			};
			$("a", no).click(function(e){
				e.preventDefault();
				changeSlide($(this).index());
			});
			$(ar).click(function(e){
				e.preventDefault();
				var d = $(this).is(".left") ? 1 : -1;
				changeSlide(false, d);
			}).mousedown(function(){
				$(this).addClass("press")
			}).bind("mouseup mouseleave", function(){
				$(this).removeClass("press")
			});
			sl.click(function(e){
				var _t = $(this);
				if (!_t.is(".active")) {
					e.preventDefault();
					changeSlide(_t.index());
				}
			});

			var autoSlide = function(startfl){
				if (startfl && _t.p.autoSlideChange) {
					o.stop().animate({
						"opacity": 1
					}, _t.p.autoSlideChange, function(){
						// $(ar.filter(".right")).click();
						changeSlide(false, -1);
						autoSlide(true);
					})
				} else o.stop(1);
			};
			o.mouseenter(function(){
				autoSlide();
			}).mouseleave(function(){
				autoSlide(true)
			}).mouseleave();
			_t.active = sl.eq(_t.p.active).addClass("active");
			_t.left = sl.filter(".active").prev();
			if (!_t.left.length) _t.left = sl.last();
			_t.left.addClass("left");
			_t.right = sl.filter(".active").next();
			if (!_t.right.length) _t.right = sl.first();
			_t.right.addClass("right");
			setNactive(_t.active.index());
		});
	}
});

});
//})(jQuery);
}
