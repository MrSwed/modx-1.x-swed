/**
 * social-share
 *
 * Кнопки "Поделиться"
 *
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Шаблоны
 * @internal    @installset base, sample
*/

<div class="share">
 <script type="text/javascript">(function() {
  if (window.pluso)if (typeof window.pluso.start == "function") return;
  if (window.ifpluso==undefined) { window.ifpluso = 1;
   var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
   s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
   s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
   var h=d[g]('body')[0];
   h.appendChild(s);
  } } )();</script>
 <div class="pluso" data-background="transparent" data-options="medium,square,line,horizontal,counter,theme=03" data-services="google,vkontakte,odnoklassniki,facebook,twitter,moimir,email,print"></div>
</div>