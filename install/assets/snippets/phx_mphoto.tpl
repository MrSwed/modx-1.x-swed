//<?php
/**
 * phx:mphoto
 *
 * выбор фото из списка multiphoto (в параметрах номер)
 *
 * @category 	snippet
 * @version 	1.1
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Gallery
 * @internal    @installset base
 */
 
// Параметр через запятую - номер записи, номер данных 0 - маленькое изображение, 1- большое, 2 - описание
// example [+photo:mphoto+] [+photo:mphoto=`0,1`+]

$options = !empty($options)?$options:"0,0";
$options = explode(",",$options);
if (!isset($options[1])) $options[1] = 0;
$fotoArr=json_decode($output);
if ($fotoArr) return $fotoArr[$options[0]][$options[1]];
?>