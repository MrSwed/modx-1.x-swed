<?php

/*
  * description: Return an formatted date
  * usage:[+variable:dateformat=`<Format To>[|Format From]`+]
  *  for timestamp
  *   [+createdon:dateformat=`%H:%M %d.%m.%Y`+]
  *  for reformat date string from other format
  *   [+tv_var:dateformat=`%H:%M %d.%m.%Y|%d-%m-%Y %H:%M:%S`+]
  *  added by: MrSwed
*/

$debug="";
if (empty($options)) $options = "%H:%M %d.%m.%Y";
$options = explode("|",$options);
if (!is_numeric($output)) {
 if (empty($options[1])) $options[1] = "%d-%m-%Y %H:%M:%S";
 $parsed = date_parse_from_format($output,$options[1]);
 $output = mktime($parsed['hour'],$parsed['min'],$parsed['sec'],$parsed['mon']+1,$parsed['mday'],$parsed['year']+1900);
}
return strftime($options[0],$output);

?>