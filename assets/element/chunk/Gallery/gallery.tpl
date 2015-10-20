[+phx:input=`[*photos*]`:ifnotempty=`
<div class="photos">
 [[ddGetMultipleField?
 &docField=`gallery`
 &docId=`[*id*]`
 &rowTpl=`gallery_row`
 &outerTpl=`gallery_out`
 ]]
</div>
`+]