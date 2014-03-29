/**
 * mm_rules
 *
 * Common ManagerManager rules.
 *
 * @category	chunk
 * @version 	1.0.5.2
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal 	@modx_category Js
 * @internal    @overwrite false
 * @internal    @installset base, sample
 */

// more example rules are in assets/plugins/managermanager/example_mm_rules.inc.php

// example of how PHP is allowed - check that a TV named documentTags exists before creating rule
if($modx->db->getValue("SELECT COUNT(id) FROM " . $modx->getFullTableName('site_tmplvars') . " WHERE name='documentTags'")) {
    mm_widget_tags('documentTags',' '); // Give blog tag editing capabilities to the 'documentTags (3)' TV
}

mm_widget_showimagetvs(); // Always give a preview of Image TVs

/* Переменные для использования * /
$cid = isset($content['id'])?$content['id']:false;
$pid = $cid?$content['parent']:$_GET["pid"];
$tpl = $content['template'];
$pidAr = array_merge(array($pid),$modx->getParentIds($pid)); // роительский путь
/**/


mm_ddCreateSection('Параметры', 'parameters','settings');
mm_ddMoveFieldsToSection('hidePageTitle,intalias,hideChilds,hideFolders,depth,ditto_display,ditto_orderBy,DisplayListStyle','parameters');

mm_createTab('Изображения','photos');
mm_moveFieldsToTab('image,photos','photos');


mm_createTab('SEO: meta','seo_params');
mm_moveFieldsToTab('meta_title,meta_keywords,meta_description','seo_params');

