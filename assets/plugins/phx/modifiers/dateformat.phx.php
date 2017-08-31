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

$debug = "";
$from_default= "%d-%m-%Y %H:%i:%s";
if (empty($options)) $options = "%H:%M %d.%m.%Y";
$options = explode("|", $options); // [0] - format-to [1] - format-from
if (is_numeric($output) and empty($options[1])) {
	$options[1] = "U";
} else if (empty($options[1])) $options[1] = $from_default;

foreach ($options as $k => $v) if (!empty($v)) $options[$k] = str_replace("%", "", $v);

if ($outputTry = DateTime::createFromFormat($options[1],$output)) 
		$output = $outputTry->format($options[0]);
	
return $output;

?>