[+phx:input=`[*gallery*]`:ifnotempty=`
<div class="gallery">
 [[ddGetMultipleField?
 &docField=`gallery`
 &docId=`[*id*]`
 &rowTpl=`gallery_row`
 &outerTpl=`gallery_out`
 ]]
</div>
`+]