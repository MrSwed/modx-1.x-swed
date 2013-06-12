<?php

/* Retrieved from http://wiki.modxcms.com/index.php/PHx/CustomModifiers
    * description: returns the 7bit representation of a string
    * usage: [+string:specialchar+] 
*/
$options = (int)$options?(int)$options:0;
if ($options) $output = mb_substr($output,0,$options,"utf-8");
return $output;

?>