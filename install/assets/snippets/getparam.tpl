//<?php
/**
 * getParam
 * 
 * Вернуть текст в зависимости от параметра HTTP
 *
 * @category 	snippet
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal    @installset base, sample
 */

/* Description:
 *  Вернуть текст если указанный параметр HTTP ($_GET, $_POST, $_REQUEST) равен указанному значению 
 *  Если значение не указано, то проверка наличия параметра
 *  Если текст не указан, то вернет значение параметра HTTP
 *  invert - вернуть текст если условие не выполенно (нет параметра)
 * 
 * Author: 
 *      Sergey Davydov <webmaster@collection.com.ua> for MODx CMF
*/ 


$type = isset($type)?strtoupper($type):"";
$field = isset($field)?$field:"";
//$value = isset($value)?$value:false;
$text =  isset($text)?$text:"";
$textelse = isset($textelse)?$textelse:"";
$invert =  isset($invert)?$invert:false;
$notempty = isset($notempty)?$notempty:false; // if true - check only value, not existing param

$ar = array();
if ($field) {
 if (!in_array($type,explode(",","REQUEST,POST,GET"))) $type = "GET";
 
 switch($type) {
  case "GET": $ar = $_GET; break;
  case "POST": $ar = $_POST; break;
  case "REQUEST": $ar = $_REQUEST; break;
 }
 if ((isset($ar[$field]) and !$notempty ) or !empty($ar[$field])){
  if (isset($value)) {
   if ($ar[$field]==$value and !$invert) echo $text!=""?str_replace("%v",$ar[$field],$text):$ar[$field];
   else if ($invert) echo str_replace("%v",$ar[$field],$text);
   else echo $textelse;
  } else if (!$invert) {
   echo $text!=""?str_replace("%v",$ar[$field],$text):$ar[$field];
  }
 } else {
  if ($invert) echo str_replace("%v",$ar[$field],$text);
  else echo $textelse;
 }

}
