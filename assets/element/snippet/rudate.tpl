//<?php
/**
 * rudate
 * 
 * Преобразует $date в формат dd mmmm yyyy
 *
 * @category 	snippet
 * @version 	1.2
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal    @installset base, sample
 */

/* Description:
 * Вывод даты в русском формате
 * 
 * Author: 
 * Sergey Davydov <webmaster@collection.com.ua> for MODx CMF
*/ 

$date = (isset($date)?$date:($modx->documentObject["pub_date"]?$modx->documentObject["pub_date"]:$modx->documentObject["createdon"]));
$short = isset($short)?$short:false;
$print = isset($print)?$print:"%s %s %s";

if (preg_match("/[^\d]/",$date)) { // not timestamp for tv date
 list ($d, $m, $Y, $H, $M, $S) = sscanf($date, "%2d-%2d-%4d %2d:%2d:%2d");
 $date = mktime($H, $M, $S, $m, $d, $Y);
}

if ($date) {
 $m = $short ?
   array("янв.","фев.","мар.","апр.","мая","июн.","июл.","авг.","сент.","окт.","нояб.","дек."):
   array("января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");
 return sprintf($print,date("d",$date),$m[date("n",$date)-1],date("Y",$date));
}

?>
