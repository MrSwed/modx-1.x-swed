<?php
/**
	* ShowBlock
	*
	* Show the contents of the block specified by the user depending on the placement and inheritance
	*
	* @category    snippet
	* @version     0.1
	* @license     http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
	* @internal    @properties
	* @internal    @modx_category Content
	* @internal    @installset base, sample
	* @internal    @author MrSwed webmaster@sdcollection.com
	*/

/* mm_rules example :
$p = array(
	"sel_ynp_chonly" => json_encode(array(
		array("", ""), // use parent setting
		array(1, "Да"),
		array(0, "Нет"),
		array(2, "Только для дочерних")
	)),
	"text_places" => json_encode(array(
		array("", ""), // use parent
		array("beforeContent", "Перед блоком контента"),
		array("rightCol", "Правая колонка"),
		array("leftCol", "Левая колонка"),
		array("beforeText", "Перед основным текстом"),
		array("afterText", "После основного текста"),
		array("afterList", "После списка дочерних"),
		array("afterContent", "После блока контента"),
		array("none", "Отключить"),
	))
);
mm_ddCreateSection('Дополнительные блоки', 'BlocksSection');
mm_ddMoveFieldsToSection('blocks', 'BlocksSection');
mm_ddMultipleFields("blocks", '', '', 'richtext,select,select', 'Текст,Месторасположение::Если не выбрано - используются настройки родителя,Наследовать поле::Значение поля родителя будет передаваться дочерним ресурсам&sbquo; если в них не будут заданы свои тексты для соответствующих полей', 'auto', '||', '::', 0, 0, 0, 0, "||{$p['text_places']}||{$p['sel_ynp_chonly']}",'{btnToggleRaw:true}');
*/
/* before create this snippet - old PHX call for each block was 
 [+phx:input=`[[ddGetMultipleField? &docField='blocks' &filter='1::beforeContent||2::||2::0||2::1' &columns='0']]`:ifempty=`[[getInheritField? &id=`[*parent*]` &field=`blocks` &runSnippet=`ddGetMultipleField? &string='%s'  &filter='1::beforeContent||2::1||2::2' &columns='0'`]]`:out=`<div class="beforeContent">%s</div>`+]
*/

if (empty($name)) return ""; // block name is required
$id = isset($id) ? $id : $modx->documentObject['id'];
$tv = isset($tv) ? $tv : "blocks";
$out = isset($out) ? $out : "<div class='$name'>%s</div>";

// get for current doc
$value = $modx->evalSnippets("[[ddGetMultipleField? &docField='$tv' &filter='1::$name||2::||2::0||2::1' &columns='0']]");
if (empty($value)) {
	if ($id == $modx->documentObject['id']) $docData = $modx->documentObject;
	else $docData = $modx->getDocument($id, "parent");
	$value = $modx->evalSnippets("[[getInheritField? &id=`{$docData["parent"]}` &field=`$tv` &runSnippet=`ddGetMultipleField? &string='%s'  &filter='1::$name||2::1||2::2' &columns='0'`]]");
}

return $value ?	($out ? sprintf($out, $value) : "") :	"";

?>