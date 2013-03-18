//<?php
/**
 * getDocumentField
 * 
 * Получить значение указанного поля (по умолчанию pagetitle) для указанного ID документа
 *
 * @category 	snippet
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal    @installset base, sample
 */


$id = isset($id)?$id:$modx->documentObject['id'];
$field = isset($field)?$field:"pagetitle";
$data = "";

 if ( $id == $modx->documentObject['id']) $data = $modx->documentObject[$field];
 else  {
  $data = $modx->getDocument($id,$field);
  if (is_array($data)) $data = reset($data);
 }
 echo $data;
