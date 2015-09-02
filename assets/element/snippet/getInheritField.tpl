<?php
/**
 * getInheritField
 *
 * Получить значение наследуемого параметра
 *
 * @category 	snippet
 * @version 	1.4
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @author 	Sergey Davydov <webmaster@sdcollection.com>
 * @internal	@properties
 * @internal	@modx_category Utils
 * @internal	@installset base, sample
 */

/** Получает значение родительского параметра, если значение не указано (или равно заданному в &toparent)
 * Параметры (= умолчания):
 *  &id          = [*id*]   // ID ресурса, с которого начинать поиск вверх по родителям
 *  &field       =          // Поле, которое необходимо определять
 *  &default     =          // Значение по умолчания, если не нашли значение поля до самого верха
 *  &toparent    =          // Флаг перехода к получению значения родителя
 *  &deep        = 100      // Максимальная вложенность поиска
 *  &out         = %s       // Формат выходного результата (sprintf, %s буде заменен на найденное значение)
 *  &outEmpty    = %s       // Формат результата если значение не найдено
 *  &rootID      = 0        // ID коневого (верхнего) раздела, выше которого уже не искать
 *  &runSnippet  = false    // Выполнить сниппет для обработки каждого найденного значения,
 *                          // формат строки как при обычном вызове, но без ограничивающих скобок, можно использовать другие кавычки
 *                          // для подстановки значения использовать %s
 * Примеры:
 *  - Получить значение флага "Скрыть дочерние"
 *  [[getInheritField? &id=`[*id*]` &field=`hideChilds`]]
 *
 *  - Определить порядок сортировки Ditto - Указать умолчания
 *  [[getInheritField? &id=`[*id*]` &field=`ditto_orderBy` &default=`menuindex asc` ]]
 *
 *  - форматирование выходного результата
 *  [[getInheritField? &id=`[*id*]` &field=`DisplayListStyle` &out=`class="%s"`]]
 *
 *  - начиная с родителя, получить значение мультиполя колонки 1 - выполнить спиппет ddGetMultipleField с фильтрацией результатов
 *   [[getInheritField? &id=`[*parent*]` &field=`addtexts` &runSnippet=`ddGetMultipleField? &string='%s'  &filter='1::beforeText||2::1' &columns='0'`]]
 */

$id     = isset($id)?$id:$modx->documentObject['id'];
$field  = isset($field)?$field:"";
$default = isset($default)?$default:"";
$toparent = isset($toparent)?$toparent:"";
$deep = isset($deep)?$deep:100;
$out = isset($out)?$out:"%s";
$outEmpty = isset($outEmpty)?$outEmpty:"%s";
$rootID = isset($rootID)?$rootID:0;
$runSnippet = isset($runSnippet)?$runSnippet:false;

$value = $toparent;
$cid = $id;
while ( $value == $toparent and (int)$cid!=$rootID and --$deep > 0) {
 $value = $modx->getTemplateVarOutput(array($field,"parent"), $cid, 1);
 $cid = $value["parent"];
 $value = $value[$field];
 if ($runSnippet) $value = $modx->evalSnippets("[[".sprintf($runSnippet,$value)."]]");

}
if ($value == $toparent) $value = $default;
return $value?
 ($out?sprintf($out,$value):""):
 ($outEmpty?sprintf($outEmpty,$value):"");