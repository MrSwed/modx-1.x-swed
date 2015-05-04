[+phx:input=`[*photos*]`:ifnotempty=`
<div class="photos">
 [[ddGetMultipleField?
 &docField=`photos`
 &docId=`[*id*]`
 &rowTpl=`photos_row`
 &outerTpl=`photos_out`
 ]]
</div>
`+]