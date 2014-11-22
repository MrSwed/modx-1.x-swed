<div class="content">
 <div class="inner">[+phx:input=`[[getInheritField? &id=`[*id*]` &field=`hideBreadcrumbs`]]`:ne=`1`:then=`
  <div class="crumbs">[[Breadcrumbs? &showCurrentCrumb=`1` &respectHidemenu=`0`]]</div>`+] 
  [+phx:input=`[*parent*]`:ne=`1`:and:if=`[[getInheritField? &id=`[*id*]` &field=`showParentTitle`]]`:is=`1`:then=`
   <h1>[+phx:input=`[*parent*]`:docfield+]</h1>
   [+phx:input=`[*hidePageTitle*]`:ne=`1`:then=`<h2>[*pagetitle*]</h2>`+]
  `:else=`
   [+phx:input=`[*hidePageTitle*]`:ne=`1`:then=`<h1>[*pagetitle*]</h1>`+]
 `+]
  [+phx:input=`[*isfolder*]`:ne=`1`:and:if=`[[getInheritField? &id=`[*id*]` &field=`showDateInContent`]]`:is=`1`:then=`<div class="date">[*phx:input=`[*pub_date:ne=`0`:then=`[*pub_date*]`:else=`[*publishedon*]`*]`:dateformat=`%d.%m.%Y`*]</div>`+]
 [*beforeContent*]
 <div class="text">
  [*content*]
 </div>
 [+phx:input=`[*isfolder*]`:ne=`1`:and:if=`[*tags*]`:ne=``:then=`{{pageTags}}`+]
 [+phx:input=`[[getInheritField? &id=`[*id*]` &field=`inheritAfterContent`]]`:is=`1`:then=`[[getInheritField? &id=`[*id*]` &field=`afterContent`]]`:else=`[*afterContent*]`+]


 [+phx:input=`[*isfolder*]`:is=`1`:and:if=`[!getInheritField? &id=`[*id*]` &field=`hideChilds`!]`:ne=`1`:then=`
 <div class="items [!getInheritField? &id=`[*id*]` &field=`DisplayListStyle` !] [!getInheritField? &id=`[*id*]` &field=`intalias` !]">
  [!Ditto?
  &tpl=`item[!getExtend? &value=`[!getInheritField? &id=`[*id*]` &field=`intalias` &out=`_%s`!][!getInheritField? &id=`[*id*]` &field=`DisplayListStyle` &out=`_%s`!]` &check=`chunk` &checkName=`item%s` !]`
  &orderBy=`[!getInheritField? &id=`[*id*]` &field=`ditto_orderBy` &default=`menuindex asc` !]`
//  &dateFormat=`%s`
  &dateFormat=`%d.%m.%Y`
  &extenders=`summary`
  &depth=`[!getInheritField? &id=`[*id*]` &field=`depth` &default=`0` !]`
  &hideFolders=`[!getInheritField? &id=`[*id*]` &field=`hideFolders` !]`
  &paginate=`1`
  &dateSource=`pub_date`
  &paginateAlwaysShowLinks=`1`
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
  {{paginator}}
 </div> <!-- /items -->
 <div class="endcol"></div>
 `+]

 {{social-share}}
</div>
</div>
