<?php
/**
	* ShowBlock
	*
	* Show the contents of the block specified by the user depending on the placement and inheritance
	*
	* @category      snippet
	* @version       0.3
	* @license       http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
	* @internal      @properties
	* @internal      @modx_category Content
	* @internal      @installset base, sample
	* @author        MrSwed webmaster@sdcollection.com
	* @requirements  Snippet ddGetMultipleField https://github.com/MrSwed/MODXEvo.snippet.ddGetMultipleField
	*/

/* mm_rules example :
$p = array(
	"text_places" => json_encode(array(
		array("", ""),
		array("beforeContent", "Перед блоком контента"),
		array("rightCol", "Правая колонка"),
		array("leftCol", "Левая колонка"),
		array("beforeText", "Перед основным текстом"),
		array("afterText", "После основного текста"),
		array("afterList", "После списка дочерних"),
		array("afterContent", "После блока контента"),
		array("none", "Отключить"),
	)),
	"sel_inheritance" => json_encode(array(
		array("", ""), // use parent setting
		array(0, "Нет, отменить наследование"),
		array(1, "Для всех"),
		array(2, "Только для дочерних"),
		array(3, "Для контейнеров"),
		array(4, "Для дочерних контейнеров"),
		array(5, "Да, кроме контейнеров")
	))
);
mm_ddCreateSection('Дополнительные блоки', 'BlocksSection');
mm_ddMoveFieldsToSection('blocks', 'BlocksSection');
mm_ddMultipleFields("blocks", '', '', 'richtext,select,select', 'Текст,Месторасположение::Если не выбрано - используются настройки родителя,Наследовать поле::Значение поля родителя будет передаваться дочерним ресурсам&sbquo; если в них не будут заданы свои тексты для соответствующих полей', 'auto', '||', '::', 0, 0, 0, 0, "||{$p['text_places']}||{$p['sel_inheritance']}",'{btnToggleRaw:true}');
*/
/* before create this snippet - old PHX call for each block was 
 [+phx:input=`[[ddGetMultipleField? &docField='blocks' &filter='1::beforeContent||2::||2::0||2::1' &columns='0']]`:ifempty=`[[getInheritField? &id=`[*parent*]` &field=`blocks` &runSnippet=`ddGetMultipleField? &string='%s'  &filter='1::beforeContent||2::1||2::2' &columns='0'`]]`:out=`<div class="beforeContent">%s</div>`+]
*/

/*

	text_places - Любые заданные разработчиком места расположения, Соостветственно вызов сниппета 
               [[ShowBlock? &name=`< задданое имя >` ]], например [[ShowBlock? &name=`beforeContent` ]]
               
		sel_inheritance - Настройки наследования             
		  не задано -  используются значения родителя, т.е. заданное значение будет отображено только для текухего документа, дочерние покажут значения родителя
		      0     -  "Нет, отменить наследование". Достаточно указать для одного одноименного блока, при условии что для остальных ничего не задано, иначе будут действовать другие условия наследования
		      1     -  "Для всех". Все типы дочерних наследуют указанный блок
		      2     -  "Только для дочерних". В текущем документе блок показан не будет
		      3     -  "Для контейнеров". Если текущий - контейнер, то в нем и в дочерних контейнерах блок будет отображен 
		      4     -  "Для дочерних контейнеров". В текущем блок показан не будет.
		      5     -  "Да, кроме контейнеров". Если текущий не контейнер, блок будет отображен, аналогично для дочерних.
	))
 
 Для пользователя. Возможно указывать несколько раз один блок. В этом случае порядок вывода определяется заданной очередностью.
 Важно обратить внимаение, в случае, если блок используется несколько раз с разными настройками наследования, то для дочерних будут использованя правила и блоки этого документа. 
 Также, если для текущего, если задан хоть один одноименной блок, то родительские одноименные блоки показаны не будут (в случае если для блока нет других настроек). 
 Однако, если для него не указано наследование, то дочерние документы будут использовать блоки старшего родителя.
 */

if (empty($name)) return ""; // block name is required
$id = isset($id) ? $id : $modx->documentObject['id'];
$tv = isset($tv) ? $tv : "blocks";
$out = isset($out) ? $out : "<div class='$name'>%s</div>";
$rootID = isset($rootID) ? $rootID : 0;
$depth = isset($depth) ? $depth : 100;

if ($id == $modx->documentObject['id']) $docData = $modx->documentObject;
else $docData = $modx->getDocument($id, "parent,isfolder");

// Ппроверка значений текущего документа
$value = $modx->evalSnippets("[[ddGetMultipleField? &docField='$tv' &filter='1::$name||2::||2::0||2::1".((int)$docData["isfolder"] ? "||2::3" : "")."' &columns='0']]");

// Если для текущего ничего нет, ищем родительские с разрешенным наследованием
$cid = $id;
while (empty($value) and (int)$cid != $rootID and --$depth > 0) {
	$value = $modx->getTemplateVarOutput(array($tv, "parent"), $cid, 1);
	$cid = $value["parent"];
	$value = $value[$tv];
	if ("0" == $modx->evalSnippets("[[ddGetMultipleField? &string='$value'  &filter='1::$name||2::0||2::1||2::2".((int)$docData["isfolder"] ? "||2::3||2::4" : "||2::5")."' &columns='2']]")) {
		$value = ""; // Наследование отменено
		break;
	} else $value = $modx->evalSnippets("[[ddGetMultipleField? &string='$value'  &filter='1::$name||2::1||2::2".((int)$docData["isfolder"] ? "||2::3||2::4" : "||2::5")."' &columns='0']]");
}
return $value ? ($out ? sprintf($out, $value) : "") : "";
?>