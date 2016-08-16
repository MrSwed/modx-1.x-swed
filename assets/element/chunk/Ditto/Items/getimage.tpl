[[getImage? 
 &tv=`image` 
 &id=`[+id+]`
 &data=`[[ddGetMultipleField? &docField=`gallery` &columns=`0` &totalRows=`1` &docId=`[+id+]` ]]`
 &runSnippet=` phpthumb? &input='%s' &options='w=300,h=300' ` 
 &out=`<a href="[(site_url)][~[+id+]~]" class="image"  title="[+pagetitle:specialchar+]"><img src="%s" alt="[+pagetitle:specialchar+]" /></a>`
]]