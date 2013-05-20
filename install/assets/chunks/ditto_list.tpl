/**
 * ditto_list
 * 
 * Пример использования Ditto для вывода содержимого раздела (если есть дочерние). Документ должен быть не кешируемым!
 * 
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Ditto
 * @internal    @installset base, sample
 */
[*isfolder:is=`1`:then=`
<div class="items">
 [[Ditto? &id=`content[*id*]` &tpl=`item_news` &orderBy=`pub_date DESC,createdon desc` &dateFormat=`%s` &extenders=`summary`  &paginate=1 &dateSource=`pub_date` &paginateAlwaysShowLinks=0 &display=`[[getParam? &field=`all` &text=`all` &textelse=`5`]]` &tplPaginatePage=`ditto-padination-link` &tplPaginateCurrentPage=`ditto-pagination-current` &noResults=``]]
 {{paginator}}
 </div> <!-- /items -->
 <div class="endcol"></div>
`*]