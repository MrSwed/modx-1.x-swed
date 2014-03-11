/**
 * Основной
 *
 * Основной шаблон
 *
 * @category	template
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@lock_template 0
 * @internal 	@modx_category Шаблоны
 * @internal    @installset sample
 */

{{HEADER}}

<div class="content">
 [*beforeContent*]
 [+phx:input=`[!getInheritField? &id=`[*id*]` &field=`hidePageTitle`!]`:not=`1`:then=`<h1>[*pagetitle*]</h1>`+]
 <div class="text">
  [*content*]
 </div>
 [+!!EXAMPLE!! phx:input=`[[UltimateParent? &id=`[*id*]` &topLevel=`2`]]`:in=`52`:and:if=`[*isfolder*]`:is=`0`:then=`<div class="more"><a href="[~112~]?id=[*id*]" class="btn order">Заказать</a></div>`+]
 [*afterContent*]

 [+phx:input=`[*isfolder*]`:is=`1`:and:if=`[!getInheritField? &id=`[*id*]` &field=`hideChilds`!]`:ne=`1`:then=`
 <div class="items [!getInheritField? &id=`[*id*]` &field=`intalias` !]">
  [!Ditto?
  &tpl=`item[!getExtend? &value=`[!getInheritField? &id=`[*id*]` &field=`intalias` !]` &check=`chunk` &checkName=`item_%s` &out=`_%s`!]`
  &orderBy=`[!getInheritField? &id=`[*id*]` &field=`ditto_orderBy` &default=`menuindex asc` !]`
  &dateFormat=`%s`
  &extenders=`summary`
  &depth=`[!getInheritField? &id=`[*id*]` &field=`depth` &default=`0` !]`
  &hideFolders=`[!getInheritField? &id=`[*id*]` &field=`hideFolders` !]`
  &paginate=1
  &dateSource=`pub_date`
  &paginateAlwaysShowLinks=1
  &display=`[!getParam? &field=`all` &text=`all` &textelse=`[!getInheritField? &id=`[*id*]` &field=`ditto_display` &default=`10` !]`!]`
  &tplPaginatePage=`ditto-padination-link`
  &tplPaginateCurrentPage=`ditto-pagination-current`
  &tplPaginateNext=`ditto-next`
  &tplPaginateNextOff=`ditto-next-off`
  &tplPaginatePrevious=`ditto-prev`
  &tplPaginatePreviousOff=`ditto-prev-off`
  &noResults=``
  &debug=`0`
  !]
  [+totalPages:gt=`1`:then=`{{paginator}}`+]
 </div> <!-- /items -->
 <div class="endcol"></div>

 `+]

 {{social-likes}}
</div>

{{FOOTER}}