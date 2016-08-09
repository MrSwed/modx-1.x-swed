if (typeof jQuery == "function") {
//jQuery.noConflict();
//(function($) { 
 $(function(){




 $.fn.extend({
  // http://jsfiddle.net/swed/wLnzw4Lu
  "class": function(){
   return $(this).attr("class") || $(this).selector.toString().replace(/^.*[\s]+([^\s])/, "$1").replace(/(^[^\.]+\.|[:][^\s]+)/, "").split(".").join(" ").trim();
  },
  "slider": function(p){
   p = $.extend({}, {
    "animationSpeed": 1000,
    "autoSlideChange": 5000,
    "wrapper": ".wrapper",
    "slide": ".slide",
    "numbers": ".numbers",
    "arrow": ".arrow",
    "active": 0
   }, p);
   return $(this).each(function(){
    var _t = this;
    _t.p = p;
    var o = $(this);
    var sl = typeof t==="object" ? $(_t.p.slide) : $(_t.p.slide, o);
    var w = typeof t==="object" ? $(_t.p.wrapper) : $(_t.p.wrapper, o);
    if (!w.length) {
     w = sl.wrapAll("<div></div>").parent().addClass(w.class());
    }
    var ar = _t.p.arrow && (typeof t==="object" ? $(_t.p.arrow) : $(_t.p.arrow, o));
    if (ar && !ar.length) {
     ar = $("<a href='#' class='left'></a><a href='#' class='right'></a>").addClass(ar.class());
     o.append(ar);
    }
    var no = _t.p.numbers && typeof t==="object" ? $(_t.p.numbers) : $(_t.p.numbers, o);
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
    $(sl).filter(":visible").addClass("active");
    var changeSlide = function(n, direction){
     var actS = sl.filter(".active");
     if (actS.is(":animated") || actS.index() == n) return;
     var NactS = sl.filter(":eq(" + n + ")");
     if (!direction) {
      direction = -1;
      if (actS.index() > n || actS.index() == sl.size() - 1) direction = 1;
     }
     NactS.css({"left": -1 * direction * w.width(), "display": "block"})
      .stop().animate({"left": 0}, _t.p.animationSpeed, function(){
      $(this).addClass("active");
      setNactive($(this).index())
     });
     actS.stop().animate({"left": direction * w.width()}, _t.p.animationSpeed, function(){
      $(this).removeClass("active").hide();
     });
    };
    $("a", no).click(function(e){
     e.preventDefault();
     changeSlide($(this).index());
    });
    $(ar).click(function(e){
     e.preventDefault();
     var cn = sl.filter(".active").index();
     var d = $(this).is(".left") ? 1 : -1;
     var n = cn == sl.size() - 1 ? 0 : cn + 1;
     if (d > 0) n = cn == 0 ? sl.size() - 1 : cn - 1;
     changeSlide(n, d);
    }).mousedown(function(){
     $(this).addClass("press")
    }).bind("mouseup mouseleave", function(){
     $(this).removeClass("press")
    });

    var autoSlide = function(startfl){
     if (startfl && _t.p.autoSlideChange) {
      o.stop().animate({"opacity": 1}, _t.p.autoSlideChange, function(){
       $(ar.filter(".right")).click();
       autoSlide(true);
      })
     } else o.stop(1);
    };
    o.mouseenter(function(){autoSlide();
    }).mouseleave(function(){autoSlide(true)
    }).mouseleave();
    sl.eq(_t.p.active).addClass("active");
    setNactive(sl.filter(".active").index());
    
   });
  }
 });

});
//})(jQuery);
}


/* html


<div class="slider">
    <div class="slide">
 <!-- img, html etc -->
    </div>
    <div class="slide">
 <!-- img, html etc -->
    </div>
    <div class="slide">
 <!-- img, html etc -->
    </div>
 </div> 

*/
/* less for .slider elements
.slider {
	background: #ccc;
	border-radius:10px;
	border-color: #EBEBEB;
	border-style: solid;
	border-width: 0 1px 1px;
	padding:10px;
	margin:0 auto;
	width: 200px;
	&,.wrapper, div {
		position:relative;    
	}    
	.numbers {
		position: absolute;
		z-index: 10;
		bottom:18px;
		left:18px;
		font-family: Arial;
		font-size: 14px;
		border-radius:10px;
		background: rgba(125,125,125,0.8);
		a {
			color: black;
			display: inline-block;
			height: 22px;
			line-height: 20px;
			text-align: center;
			text-decoration: none;
			width: 22px;
			margin: 0 2px;
		}
		a:hover {
			background-position: 0 0;
		}
		a.active {
			background-position: 0 -44px;
			color:white;
		}
	}
	.arrow {
		position: absolute;
		top: 50%;
    transform:translateY(-25%);
    z-index: 1;
		width:37px;
		height:82px;
		display: block;
		background-position: center center;
		background-repeat: no-repeat;
			&:before {
				content:'';
				position: absolute;
				display: block;
				border-color: #fff #fff transparent transparent;
				border-width:3px;
				border-style: solid;
				width: 30px;
				height: 30px;
				transform:rotate(45deg);
				z-index: 1;
				box-shadow: -6px 6px 14px -9px #333 inset;
		}
		&.left {
			left:5px;
			&:before {
				transform: rotate(-135deg);
			}
		}
		&.right {
			right:5px;
		}
	}
	.slide {
		height: inherit;
		position: absolute;
		width: inherit;
		display:none;
		&.active {
			display: block;
		}
	}
	.wrapper {
		height: 200px;
		overflow: hidden;
		width: 100%;
	}
	img {
		max-height:100%;
		max-width:100%;
	}
}
*/

