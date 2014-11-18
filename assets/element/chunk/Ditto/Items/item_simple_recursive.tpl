[*phx:input=`[+isfolder+]`:is=`1`:then=`
<h2>[+title+]:</h2>
<div class="items [[getInheritField? &id=`[+id+]` &field=`DisplayListStyle` ]] [[getInheritField? &id=`[+id+]` &field=`intalias` ]] ">
 [[Ditto?
 &parents=`[+id+]`
 &tpl=`item_simple_recursive`
 &orderBy=`[[getInheritField? &id=`[+id+]` &field=`ditto_orderBy` &default=`menuindex asc` ]]`
 &paginate=`0`
 &display=`all`
 &noResults=``
 ]]
 <div class="enddiv"></div>
</div>
`:else=`
<div class="item">
 <div class="image">{{getimage}}</div>
 <div class="text">
  <a href="[(site_url)][~[+id+]~]" class="caption">[+title+]</a>
  [+introtext+]
 </div>
</div>
`*]