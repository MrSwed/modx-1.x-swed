[+phx:if=`[*image*]`:notempty=`
<div class="product image">
	<a href="[*image*]" rel="gallery"  title="[*pagetitle:specialchar*]">
		<img src="[[phpthumb? &input=`[*image*]` &options=`w=200,h=200`]]" alt="[*pagetitle:specialchar*]" />
	</a>
</div>
`+]