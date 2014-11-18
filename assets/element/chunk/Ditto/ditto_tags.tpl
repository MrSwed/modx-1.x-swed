<div class="items">
 [[Ditto?
  &tpl=`item_tags`
  &parents=`0`
  &depth=`0`
  &orderBy=`pub_date DESC, createdon desc`
  &dateFormat=`%d.%m.%Y`
  &tagData=`tags`
  &tagDelimiter=`,`
  &paginate=`1`
  &dateSource=`pub_date`
  &paginateAlwaysShowLinks=`1`
  &display=`[[getParam? &field=`all` &text=`all` &textelse=`[[getInheritField? &id=`[*id*]` &field=`ditto_display` &default=`10` ]]`]]`
  &tplPaginatePage=`ditto-padination-link`
  &tplPaginateCurrentPage=`ditto-pagination-current`
  &tplPaginateNext=`ditto-next`
  &tplPaginateNextOff=`ditto-next-off`
  &tplPaginatePrevious=`ditto-prev`
  &tplPaginatePreviousOff=`ditto-prev-off`
 ]]
 {{paginator}}
</div>