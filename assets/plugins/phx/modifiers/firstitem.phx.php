<?php

/* Retrieved from http://wiki.modxcms.com/index.php/PHx/CustomModifiers
    * description: returns the first item in list delimeted by comma
    * usage: [+string:firstitem+] 
*/

return reset(explode(",",$output));

?>