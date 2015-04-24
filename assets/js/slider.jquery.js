if (typeof jQuery == "function") {
//jQuery.noConflict();
//(function($) { 
 $(function(){




(function(o){
 o = $(o);
 var animationSpeed = 1000;
 var autoSlideChange = 5000;
 var w = $(".wrapper",o);
 var sl = $(".slide",o);
 var no = $(".numbers",o);
 var ar = $(".arrow",o);
 sl.each(function(i){
  no.append("<a href='#'>"+(i+1)+"</a>");
 });
 var setNactive = function(n) {
  $("a",no).removeClass("active");
  $("a:eq("+n+")",no).addClass("active");
 }
 $(sl).filter(":visible").addClass("active");
 setNactive(sl.filter(".active").index());
 var changeSlide = function(n,direction) {
  var actS = sl.filter(".active");
  if (actS.is(":animated")||actS.index()==n) return;
  var NactS = sl.filter(":eq("+n+")");
  if (!direction) {
   direction = -1;
   if (actS.index() > n || actS.index()==sl.size()-1) direction = 1;
  }
  NactS.css({"left":-1*direction*w.width(),"display":"block"})
   .stop().animate({"left":0},animationSpeed,function(){$(this).addClass("active");setNactive($(this).index())});
  actS.stop().animate({"left":direction*w.width()},animationSpeed,function(){$(this).removeClass("active").hide();});
 }
 $("a",no).click(function(e){
  e.preventDefault();
  changeSlide($(this).index());
 });
 $("a",ar).click(function(e){
  e.preventDefault();
  var cn = sl.filter(".active").index();
  var d = $(this).parent().is(".left")?1:-1;
  var n = cn==sl.size()-1?0:cn+1;
  if (d > 0) n = cn==0?sl.size()-1:cn-1;
  changeSlide(n,d);
 }).mousedown(function(){$(this).addClass("press")}).bind("mouseup mouseleave",function(){$(this).removeClass("press")});

 var autoSlide = function(startfl){
  if (startfl) {
   o.stop().animate({"opacity":1},autoSlideChange,function(){
    $("a",ar.filter(".right")).click();
    autoSlide(true);
   })
  } else o.stop(1);
 }
 o.mouseenter(function(){
  autoSlide();
 }).mouseleave(function(){autoSlide(true)}).mouseleave();

})(".main .slider");
});
//})(jQuery);
}


/* html


<div class="slider">
  <div class="arrow left"><a href="#"></a></div>
  <div class="arrow right"><a href="#"></a></div>
  <div class="numbers"></div>
  <div class="wrapper">
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
 </div> 

*/
/* css for .slider elements

.slider {
  background: url("images/slider-shadow.png") repeat-x scroll center bottom white;
  border-color: #EBEBEB;
  border-style: solid;
  border-width: 0 1px 1px;
  padding-bottom: 3px;
}
.slider .numbers {
 position: absolute;
 z-index: 10;
 bottom:18px;
 left:18px;
 font-family: Arial;
 font-size: 14px;
}
.slider .numbers a {
 background-image: url("images/slider-num-bg.png");
 background-position: 0 -22px;
 background-repeat: no-repeat;
 color: black;
 display: inline-block;
 height: 22px;
 line-height: 20px;
 text-align: center;
 text-decoration: none;
 width: 22px;
 margin: 0 2px;
}
.slider .numbers a:hover {
 background-position: 0 0;
}

.slider .numbers a.active {
 background-position: 0 -44px;
 color:white;

}

.slider .arrow {
  margin-top: -35px;
  position: absolute;
  top: 50%;
}
.slider .arrow a{
 width:37px; height:82px;
 display: block;
 background-position: center center;
 background-repeat: no-repeat;
 background-image: url("images/arrows-slider.png");
}
.slider .arrow.left {left:-70px}
.slider .arrow.right {right:-70px}

.slider .arrow.left a        { background-position:0px 0px}
.slider .arrow.left a:hover  { background-position:0px -82px}
.slider .arrow.left a.press  { background-position:0px -165px}
.slider .arrow.right a       { background-position:-38px 0px}
.slider .arrow.right a:hover { background-position:-38px -82px}
.slider .arrow.right a.press { background-position:-38px -165px}
.slider .wrapper {
  height: 308px;
  overflow: hidden;
  width: 100%;
}
.slider .wrapper .slide {
  height: inherit;
  position: absolute;
  width: inherit;
  display:none;
}
.slider .wrapper .slide:first-child {
 display:block;
}
*/

