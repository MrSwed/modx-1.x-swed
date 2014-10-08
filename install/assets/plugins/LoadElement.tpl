//<?php
/**
 * LoadElement
 *
 * Загрузка чанков и сниппетов из файлов
 *
 * @license     GNU General Public License (GPL), http://www.gnu.org/copyleft/gpl.html
 * @author      Agel_Nash <modx@agel-nash.ru>
 * @version     0.2
 * @internal    @events         OnWebPageInit,OnManagerPageInit,OnPageNotFound
 * @internal    @properties     &extChunk=Расширения чанков (<i>через запятую</i>);input;txt,html,tpl &extSnippet=Расширения сниппетов (<i>через запятую</i>);input;php,tpl &pathElement=Папка с элементами (<i>относительно корня сайта</i>);input;assets/element/
 * @internal    @legacy_names LoadElement
 * @internal    @modx_category Content
 * @internal    @installset base, sample
*/

require MODX_BASE_PATH.'assets/plugins/plugin.LoadElement.php';
