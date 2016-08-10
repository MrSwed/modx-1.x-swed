#PHx modifier

An collection of PHx Modifiers for MODX Evolution


#Installation:
Copy the files into `assets/plugins/phx/modifiers` (if the PHx Plugin is 
installed) or insert them as snippet named 'phx:filename' (without '') 
in the MODx backend.


#Content:

##Standart package

Modifier | Description
-------- | -----------
**7bit** | returns the 7bit representation of a string. Example: <code>[+string:7bit+]</code>
**bbcode** | parse bb code (also escapes all html and MODx tags characters). Example: <code>[+variable:bbcode+]</code> 
**get** | Returns the GET parameter which has been posted as a query string. Example: <code>[\*phx:get=&#96;paramname`\*]</code>
**ifnotempty** | The opposite of the native PHX "**isempty**" function. Returns the option value ONLY if the input value is empty (excluding whitespace), Example <code>[+string:ifnotempty=&#96;String to return if not empty&#96;+]</code> 
**nohttp** | Removes the http:// from a URL, to create a display-friendly web address. Example: <code>[+string:nohttp+]</code>
**parent** | Get specified document field from parent document. This one is changed from standard - it get parent even if it inactive . Example: <code>[+phx=&#96;[\*id\*]&#96;:parent=&#96;field&#96;+]</code>
**post** | Same as **get** for POST requests
**tidyword** |  Get the Word infested input


##Modifiers retrieved from [wiki.modxcms.com](http://wiki.modxcms.com/index.php/PHx/CustomModifiers)

Modifier | Description
-------- | -----------
**docfield** | Returns a document field (defaults to **pagetitle**). Example: <code>[+phx=&#96;[\*id\*]`:docfield=&#96;field&#96;+]</code>.
**zeropad** | Zero-padding a string. Takes the number of total digits as the input. Example: <code>[+ditto_iteration:zeropad=&#96;3&#96;+] [\*zipcode:zeropad=&#96;5&#96;\*]</code>

##Other modifiers:

Modifier | Description
-------- | -----------
**dateformat** | Return an formatted date. Example: from timestamp: <code>[+createdon:dateformat=&#96;%H:%M %d.%m.%Y&#96;+]</code>, from date string in other format <code>[+tv_var:dateformat=&#96;%H:%M %d.%m.%Y&#124;%d-%m-%Y %H:%M:%S&#96;+]</code>
**default** | Return an default text if variable is empty. Example <code>[\*variable:default=&#96;Default text`\*]</code>
**doclevel** | Returns the doclevel of a given docid. Example: <code>[+docid:doclevel+]</code>
**element** | Get an element of multivalue. Example: first element: <code>[\*tv_var:element\*]</code>, same, but delimited by "::" <code>[\*tv_var:element=&#96;0::&#96;\*]</code>, get second, delimited by "&#124;&#124;" <code>[\*tv_var:element=&#96;1&#124;&#124;&#96;\*]</code>, get thidr, delimited by comma <code>[\*tv_var:element=&#96;2,`\*]</code>, get from an resource <code>[+phx:input=&#96;1&#96;:docfield=&#96;tv_var&#96;:element=&#96;0::&#96;+]</code>
**firstitem** | returns the first item in list delimeted by comma. Example: <code>[+string:firstitem+]</code> 
**in** | Check  value is in array delimited by one of: ";,".Example: <code>[+variable:in=&#96;1,2,3;4;5`:then=&#96;This is in&#96;+]</code>
**isnotnumeric** | Check the string is not numeric. Example: <code>[+string:isnotnumeric:then=&#96;Is not numeric`:else=&#96;Is numeric&#96;+]</code>
**isnumeric** | Check the string is numeric. Example: <code>[+string:numeric:then=&#96;Is Numeric`:else=&#96;Is not numeric&#96;+]</code>
**jsonencode** | Returns the JSON representation of the string with or not stripouterquotes (set option 0 or 1). Example: <code>[+string:jsonencode=&#96;0&#96;+]</code>
**num_format** | format a numeric value. <code>[+variable:num_format=&#96;decimals&#124;dec_point&#124;thousands_sep&#96;+]</code>
**pregreplace** | Replace in string by regular expression. Example: <code>[+variable:preg_replace=&#96;/regexp/&#124;&#124;str_replace_to&#96;+]</code>
**specialchar** | Returns the htmlspecialchars of a string. Example: <code>[+string:specialchar+]</code> 
**striptags** | Remove html tags from text. Example: <code>[+text:striptags+]</code>
**switch** | Switch for PHx. Example: <code>[+string:switch=&#96;xx:{{Chunk}}&#124;yy:[\*DocVar\*]&#124;default:[+TemplateVar+]+]</code>
**substr** | Returns a substring of a string. Example: <code>[+string:substr=&#96;0,-3&#96;+]</code>
**switchc** | Switch chunks for PHx. PHx has one big problem with (visible) chunks at the beginning of the parsing process. They would be evaluated regardless of beeing shown. Example: <code>[+string:switchc=&#96;xx:chunkname&#124;yy:chunkname&#124;default:chunkname+]</code>
**trim** | Trims a string. Stripped characters could be specified in the options of the modifier. Example: <code>[+string:trim=&#96; &#96;+]</code>
**tvelement** | Get an element(s) names of tv select value (for tv type dropdown, listbox, listbox-multiple,checkbox with possible values like "Option name==option_value&#124;&#124;Yes==1&#124;&#124;No==2&#124;&#124;So So==so-so"). Example: <code>[+phx:input=&#96;[\*id*\]&#96;:tvelement=&#96;tvaname::&lt;div class="%v"&gt;%n&lt;/div&gt;&#96;+]</code>. See more examples inside.
**utf8limit** | Returns the limited utf8 string. Example: <code>[+string:utf8limit=&#96;300&#96;+]</code>
**out** | Return as printf if not empty. Example: <code>[\*content:out=&#96;&lt;div class="wrap"&gt;%s&lt;/div&gt;&#96;\*]</code>

For more understanding see in the code of each modifier file.
