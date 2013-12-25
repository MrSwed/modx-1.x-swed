//<?php
/**
* getExtend
*
* Получает дополнительные данные для документа
 *
* @category 	snippet
* @version 	2.2
* @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
* @internal	@properties
* @internal	@modx_category Utils
* @internal   @installset base, sample
*/

 // Script Name: getExtend (modx evo 1.xx)
 // выдать поле документа в зависимости от наличия ресурса по маске искомого поля
 // &value - провериить это значение или
 // &field - поле из документа
 // &id - документа
 // &check - проверить наличие указанного типа ресурса (chunk
 // &checkName - шаблон проверки (sprintf), по умолчанию %s
 // &out - шаблон возвращаемой строки, в случае успешной проверки
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
if (!isset($value)) {
  $value = $modx->getTemplateVarOutput(array($p["field"]), $id, 1);
  $value = $docfield[$p["field"]];
}

if (!$p["check"] or ( $p["check"] == "chunk" and $chunk = $modx->getChunk(sprintf($p["checkName"],$value)))) {
 return sprintf($p["out"],$value) ;
}
return "";

// ?>
