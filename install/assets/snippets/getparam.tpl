//<?php
/**
 * getParam
 *
 * Вернуть текст в зависимости от параметра HTTP
 *
 * @category 	snippet
 * @version 	1.2 (04.11.2013)
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal    @installset base, sample
 */
//
/* Description:
 *  Вернуть текст если указанный параметр HTTP ($_GET, $_POST, $_REQUEST) равен указанному значению
 *  Если значение не указано, то проверка наличия параметра
 *  Если текст не указан, то вернет значение параметра HTTP
 *  invert - вернуть текст если условие не выполенно (нет параметра)
 *
 * Author:
 *      Sergey Davydov <webmaster@collection.com.ua> for MODx CMF
 * Примеры:
 * [[getParam? &field=`year` &text=`|year,%v,1`  &notempty=`1` &delimiter=`;`]]
 * [[getParam? &field=`year|author` &text=`|%k,%v,1`  &notempty=`1` &delimiter=`;` ]]
 *
 * История:
 * 1.2
 *  [+] - проверка нескольких
*/


$type = isset($type)?strtoupper($type):"";
$field = isset($field)?$field:"";         // Несколько значений через $delimiter
//$value = isset($value)?$value:false;    // Проверить значение
$text =  isset($text)?$text:false;        // Вернуть текст в случае успеха (если не указан, вернет значение параметра) %v - подставит значение %k - имя поля
$textelse = isset($textelse)?$textelse:""; // Текст в случае неудачи
$invert =  isset($invert)?$invert:false;   // Инвертировать условие
$notempty = isset($notempty)?$notempty:false; // if true - check only value, not existing param
$delimiter = isset($delimiter)?$delimiter:"[|,;&]"; // разделитель для нескольких значений
$quotemeta = isset($quotemeta)?$quotemeta:false; // quotemeta()

if ($field) {
 $param = array();
 if (!in_array($type,explode(",","REQUEST,POST,GET"))) $type = "GET";
 $out = "";
 switch($type) {
  case "GET": $param = $_GET; break;
  case "POST": $param = $_POST; break;
  case "REQUEST": $param = $_REQUEST; break;
 }
 if (preg_match('/('.$delimiter.')/',$field,$m)) $delimiter = $m[1];
 $field = preg_split('/'.$delimiter.'/',$field);
 if ($text!==false) $text = preg_split('/'.$delimiter.'/',$text);
 $textelse = preg_split('/'.$delimiter.'/',$textelse);
 $t="";
 $te="";
 if (!empty($debug)) {
  print "$debug\n";
  print_r($param);
  print_r($field);
 }
 foreach ($field as $i => $f) {
  if ($text and !isset($text[$i])) $text[$i] = reset($text);
  if ($textelse and !isset($textelse[$i])) $textelse[$i] = reset($textelse);
  if ($text[$i]===false) $text[$i] = $param[$f];
  if ($text[$i]) $t = str_replace(array("%k","%v"),array($f,$param[$f]),$text[$i]);
  if ($textelse[$i]) $te = str_replace(array("%k","%v"),array($f,$param[$f]),$textelse[$i]);
  if (!empty($debug)) {
   print "$i => $f text ".$text[$i]."\n";
  }
  if ((isset($param[$f]) and !$notempty ) or !empty($param[$f])){
   if (isset($value)) {
    if ($param[$f]==$value and !$invert) $out .= $text!==false?$t:$param[$f];
    else if ($invert) $out .= $t;
    else $out .= $te;
   } else if (!$invert) {
    $out .=  $text!==false?$t:$param[$f];
   }
  } else {
   if ($invert) $out .= $t;
   else $out .= $te;
  }
 }
 return $quotemeta?quotemeta($out):$out;
}
//?>