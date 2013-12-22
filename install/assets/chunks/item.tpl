/**
 * item
 * 
 * Шаблон элемента Ditto
 * 
 * @category	chunk
 * @version 	1.1
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@modx_category Ditto
 * @internal	@installset base, sample
 */
<div class="item">
 <div class="date">[+date+]</div>
 <a href="[(site_url)][~[+id+]~]" class="caption">[+title+]</a>
 <div class="text">
  <div class="image">[[getImage? &tv=`image,photos` &id=`[+id+]` &out=`<a href="[(site_url)][~[+id+]~]" class="image"><img src="%s" alt="[+title+]" /></a>`]]</div>
  [+phx:input=`[+introtext+]`:utf8limit=`450`+]</div>
 <div class="more"><a href="[(site_url)][~[+id+]~]">Подробнее</a></div>
 <div class="enddiv"></div>
</div>
