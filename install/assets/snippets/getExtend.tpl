//<?php
/**
* getExtend
*
* выдать поле документа в зависимости от наличия ресурса по маске искомого поля
*
* @category 	snippet
* @version 	2.1
* @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
* @internal	@properties
* @internal	@modx_category Utils
* @internal   @installset base, sample
*/
// Script Name: getExtend (modx evo 1.xx)
// выдать поле документа в зависимости от наличия ресурса по маске искомого поля
// &field - поле из документа
// &check - проверить наличие указанного типа ресурса (chunk
// Пример, выбрать другой шаблон элемента дитто, если он есть для родительского ресурса
// [!Ditto?
// &tpl=`item[!getExtend? &field=`alias` &id=`[[UltimateParent? &id=`[*id*]` &top=`0`]]` &check=`chunk` &checkName=`item_%s` &out=`_%s`!]`

$p = array(
 "id"     => isset($id)?$id:$modx->documentObject['id'],
 "field"  => isset($field)?$field:"alias",
 "check"  => isset($check)?$check:false,
 "checkName"  => isset($checkName)?$checkName:"%s",
 "out"  => isset($out)?$out:"%s",
);

if ( $p["id"] == $modx->documentObject['id']) $data = $modx->documentObject[$p["field"]];
else  {
 $data = $modx->getDocument($p["id"],$p["field"]);
 if (is_array($data)) $data = reset($data);
}

/// print  $data." ".sprintf($p["checkName"],$data)." " .sprintf($p["out"],$data);

if (!$p["check"] or ( $p["check"] == "chunk" and $chunk = $modx->getChunk(sprintf($p["checkName"],$data)))) {
 return sprintf($p["out"],$data) . " ???" ;
}
return "";

// ?>
