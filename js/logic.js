if (typeof jQuery == "function") {
// jQuery.noConflict();
// (function($) { 
$(function(){

// $(".content a[href]:has(img)").lightBox();
 if (typeof $.fancybox=="function")
  $("a:has(img)").filter(function(){ return (/(jp?g|bmp|gif|png)$/i).test($(this).attr("href"));})
   .each(function(){
    $(this).attr("rel",function(){return $(this).attr("rel")?$(this).attr("rel"):"gallery"})
     .fancybox()
   });
 $("a[rel='gallelry']").fancybox();
 
});
//})(jQuery);
}
