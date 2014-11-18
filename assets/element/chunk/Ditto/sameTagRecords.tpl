[+phx:if=`[*tags*]`:ne=``:then=`
<div class="related">
 <div class="caption h1">Похожие записи</div>
 <div class="items tile ">
 [!Ditto?
  &id=`sameRecords`
  &parents=`0`
  &tpl=`item_news`
  &orderBy=`pub_date DESC,createdon desc`
  &dateFormat=`%d.%m.%Y`
  &paginate=0
  &dateSource=`pub_date`
  &display=`3`
  &hideFolders=`1`
  &depth=`0`
  &noResults=``
  &tagDelimiter=`,`
  &tagData=`tags`
  &tags=`[*tags*]`
  &filter=`id,[*id*],2`
  &randomize=`1`
 !]

 </div>
</div>
`+]