[*isfolder:is=`1`:then=`
<div class="items">
 [[Ditto?
   &id=`content[*id*]`
   &tpl=`item_news`
   &orderBy=`pub_date DESC,createdon desc`
   &dateFormat=`%s`
   &extenders=`summary`
   &paginate=1
   &dateSource=`pub_date`
   &paginateAlwaysShowLinks=0
   &display=`[[getParam?
   &field=`all`
   &text=`all`
   &textelse=`5`]]`
   &tplPaginatePage=`ditto-padination-link`
   &tplPaginateCurrentPage=`ditto-pagination-current`
   &noResults=``]]
 {{paginator}}
 </div> <!-- /items -->
 <div class="endcol"></div>
`*]