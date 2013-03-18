//<?php
/**
 * rudate
 * 
 * Преобразует $date в формат dd mmmm yyyy
 *
 * @category 	snippet
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal    @installset base, sample
 */

/* Description:
 *      Вывод даты в русском формате
 * 
 * Author: 
 *      Sergey Davydov <webmaster@collection.com.ua> for MODx CMF
*/ 


$date = (int) (isset($date)?$date:($modx->documentObject["pub_date"]?$modx->documentObject["pub_date"]:$modx->documentObject["createdon"])); //timestamp
if ($date) {
 $m = array("января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");
 echo date("d",$date)." ".$m[date("n",$date)-1]." ".date("Y",$date);
}
