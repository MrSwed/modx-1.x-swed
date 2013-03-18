/**
 * item_news
 * 
 * Шаблон Ditto для вывода новостей
 * 
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Ditto
 * @internal    @installset base, sample
 */
         <div class="item">
          <div class="date"><span>[</span>[+date+]<span>]</span></div>
          <div class="subject"><a href="[(site_url)][~[+id+]~]">[+title+]</a> </div>
          <div class="short">[+introtext+]</div>
          <div class="more"><a href="[(site_url)][~[+id+]~]">Подробнее &gt;&gt;</a></div>
         </div>
