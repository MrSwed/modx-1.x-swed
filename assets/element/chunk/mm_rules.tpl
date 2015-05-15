<?
// more example rules are in assets/plugins/managermanager/example_mm_rules.inc.php

// example of how PHP is allowed - check that a TV named documentTags exists before creating rule
if($modx->db->getValue("SELECT COUNT(id) FROM " . $modx->getFullTableName('site_tmplvars') . " WHERE name='documentTags'")) {
    mm_widget_tags('documentTags',' '); // Give blog tag editing capabilities to the 'documentTags (3)' TV
}

mm_widget_showimagetvs(); // Always give a preview of Image TVs

/* Переменные для использования * /
$cid = isset($content['id'])?$content['id']:false;
$pid = !empty($content['parent'])?$content['parent']:$_GET["pid"];
$tpl = $content['template'];
$pidAr = array_merge(array($pid),$modx->getParentIds($pid)); // родительский путь
/**/
$p = array(
 "sel_ynp" => json_encode(array(
  array("",""), // use parent setting
  array(1,"Да"),array(0,"Нет")
 )),
 "sel_ynp_nof" => json_encode(array(
  array("",""), // use parent setting
  array(0,"Нет"),array(1,"Да"),array(2,"Да, кроме контейнеров")
 )),
 "text_places" => json_encode(array(
  array("beforeText","Перед основным текстом"),
  array("afterText","После основного текста"),
 ))
);


mm_ddCreateSection('Параметры (наследуемые, пустое значение наследует родителя)', 'parameters','settings');
mm_ddMoveFieldsToSection('hidePageTitle,hideBreadcrumbs,showParentTitle,showDateInContent,socialwidgets,bodyclass','parameters');
mm_ddMultipleFields("socialwidgets",'','','select,select','Поделиться {{share}},Комментарии {{comments}}','auto','||','::','','',1,1,$p["sel_ynp_nof"]);

mm_ddCreateSection('Параметры дочерних (наследуемые, пустое значение наследует родителя)', 'parameters_child','settings');
mm_ddMoveFieldsToSection('hideChilds,hideFolders,depth,ditto_display,ditto_orderBy,DisplayListStyle,intalias','parameters_child');

mm_ddCreateSection('Дополнительные тексты', 'addTexts','settings');
mm_ddMoveFieldsToSection('addtexts','addTexts');

mm_ddMultipleFields("addtexts",'','','richtext,select,select','Текст,Месторасположение,Наследовать поле::Значение поля родителя будет передаваться дочерним ресурсам','auto','||','::',0,0,0,0,"||{$p['text_places']}||{$p['sel_ynp']}");
    
mm_ddCreateSection('Отладка', 'debug','settings');
mm_ddMoveFieldsToSection('image_maket','debug');

mm_createTab('Изображения','photos');
mm_moveFieldsToTab('image,photos','photos');
mm_changeFieldHelp('photos','Используйте чанк <b>{{photos}}</b> для включения фотографий в контент');
mm_ddMultipleFields('photos', '', '', 'image,text,text', 'Изображение,Название,Описание');

mm_createTab('SEO: meta','seo_params');
mm_moveFieldsToTab('meta_title,meta_keywords,meta_description','seo_params');

