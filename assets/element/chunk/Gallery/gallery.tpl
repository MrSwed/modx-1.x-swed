[+phx:input=`[*gallery*]`:ifnotempty=`
<div class="gallery [+class+]">
 [[ddGetMultipleField?
 &docField=`gallery`
 &docId=`[*id*]`
 &rowTpl=`gallery_row`
 &outerTpl=`gallery_out`
	&startRow=`[+start+]`
	&totalRows=`[+count+]`
 ]]
</div>
`+]