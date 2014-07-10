<?php

/* description: Return formatted date
usage:[+variable:date=`<Format To>[|Format From]`+]
for timestamp
 [+createdon:date=`%H:%M %d.%m.%Y`+]

for reformat date string from other format
[+tv_var:date=`%H:%M %d.%m.%Y|%d-%m-%Y %H:%M:%S`+]

added by: MrSwed
*/
$debug="";
if (empty($options)) $options = "%H:%M %d.%m.%Y";
$options = explode("|",$options);
if (!is_numeric($output)) {
 if (empty($options[1])) $options[1] = "%d-%m-%Y %H:%M:%S";
 $parsed = strptime($output,$options[1]);
// $debug.= " get from strptime($output,{$options[1]}) ".var_export($parsed,1);
 $output = mktime($parsed['tm_hour'],$parsed['tm_min'],$parsed['tm_sec'],$parsed['tm_mon']+1,$parsed['tm_mday'],$parsed['tm_year']+1900);
}
//$debug .= " try strftime({$options[0]},$output)";
return strftime($options[0],$output);//. " <b style='font-size:10px;'>$debug</b>";

?>