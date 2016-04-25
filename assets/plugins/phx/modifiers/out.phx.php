<?php
/* 
 * description: Output special as printf if not empty 
 *  
 * usage: [*content:out=`<div class="wrap">%s</div>`*]
 * where %s will be replaced to output result
 *
 * author MrSwed <webmaster@sdcollection.com>
*/

$options = empty($options)?"%s":$options;
return $output?sprintf($options,$output):$output;