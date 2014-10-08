//<?php
/**
 * dateFormat
 *
 * Вывод даты текущего документа в указанном формате с учетом внешних условий
 *
 * @category 	snippet
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal   @installset base, sample
*/

// Пример
// [[dateFormat? &format=`<div class="date">%H:%M %d.%m.%Y</div>` &is=`[[UltimateParent? &id=`[*id*]` &top=`0`]]|[*isfolder*]` &in=`2,3,9|0` ]]
// Выведет отформатированную дату если ID родителя на втором уровне 2,3 или 9, и текущий док не контейнер

$date = (isset($date)?$date:($modx->documentObject["pub_date"]?$modx->documentObject["pub_date"]:$modx->documentObject["createdon"]));

$display = true;
// Внешния условия
$is = isset($is)?$is:"";  // Значение: 2,3,4,5|tema,4                   // 2 или 3 или 4 есть в     // tema или 4 есть в
$in = isset($in)?$in:"";  // Есть в:   1,2,3,4,5,6,7,8,9,0|tema,test,5  // 1234567                  // tema,test,5

if ($modx->documentObject["isfolder"]=="1") $is=$display=false; // временное решение

if ($is) {
 $display=false;

 $is = explode("|",$is);
 foreach ($is as &$v) $v = explode(",",$v);
 $in = explode("|",$in);
 foreach ($in as &$v) $v = explode(",",$v);
 $cond = array();
 foreach ($is as $i => $k)
  foreach ($k as $v) {
   if (!empty($in[$i]) and ( (is_array($in[$i]) and in_array($v,$in[$i])) or $v==$in[$i] ) ) {
    $cond[] = true;
    break;
   }
  }

 if ($cond) {
  $display=true; foreach ($cond as $c) if (!$c) { $display=false; break;}
 }
}

if ($display) {
 $format = (isset($format)?$format:"%d.%m.%Y");
 return strftime($format,$date);
}


