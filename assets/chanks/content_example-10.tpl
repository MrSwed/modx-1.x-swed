<div class="content">
 [*beforeContent*]
 [+ ? не работает почемуто ? phx:input=`[!getInheritField? &id=`[*id*]` &field=`hidePageTitle` !]`:ne=`1`:then=`<h1>[*pagetitle*]</h1>`+]
 [+phx:input=`[*hidePageTitle*]`:ne=`1`:then=`<h1>[*pagetitle*]</h1>`+]
 <div class="text">
  [*content*]
  [+? phx:input=`[[UltimateParent? &id=`[*id*]` &topLevel=`2`]]`:in=`52`:and:if=`[*isfolder*]`:is=`0`:then=`<div class="more"><a href="[~112~]?id=[*id*]" class="btn order">Заказать</a></div>`+]
 </div>
 [*afterContent*]

 [+phx:input=`[*isfolder*]`:is=`1`:and:if=`[!getInheritField? &id=`[*id*]` &field=`hideChilds`!]`:ne=`1`:then=`
 <div class="items [!getInheritField? &id=`[*id*]` &field=`DisplayListStyle` !] [!getInheritField? &id=`[*id*]` &field=`intalias` !]">
  [!Ditto?
  &tpl=`item[!getExtend? &value=`[!getInheritField? &id=`[*id*]` &field=`intalias` !][!getInheritField? &id=`[*id*]` &field=`DisplayListStyle` &out=`_%s`!]` &check=`chunk` &checkName=`item_%s` &out=`_%s`!]`
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
