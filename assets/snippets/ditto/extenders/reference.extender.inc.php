<?php

/*
 * Title: Reference
 * Version: 0.5
 * Purpose:
 *   if resource is a local reference (type=reference&content=Num),
 *   set values of destination document
 *
 *  Экстендер позволяет решить задачу вложения ресурса в разные места дерева
 *  стандарным средством: Создание ссылки на документ в нужном места.
 *  При проходе Ditto, экстендер заменит значения ресурса ссылки на значения документа
 *  Для указания Дополнительных TV, их нужно задать в tvfields через запятую
 *  Экстендер разрабатывался с поддержкой YAMS (для использования указать &yams_id, указывать экстендер после YAMS
 *  &extenders=`summary,search,@FILE assets/modules/yams/yams.extender.inc.php,reference`
 *  )
 *
 *  [[Ditto? ...  &extenders=`reference` &tvFields=`content2,pagetitle2` ]]
]]
*/
/*@TODO:
 * Нужен фильтр для исключения появившихся дубликатов при выводе с большой глубиной
 * Для временного решения на одном уровне, в стандарный фильтр добавляется [*parent:is=`0`:then=`|type,reference,2`*]
*/

// ---------------------------------------------------
// Group: Parameters
// Define any parameters needed in the extender or to override Ditto defaults
// ---------------------------------------------------

$reference_off = isset($reference_off) ? $reference_off : false; // отключение действия экстендера
$yams_id = isset($yams_id) ? $yams_id : false;
$dateFormat = isset($dateFormat) ? $dateFormat : false;
$dateSource = isset($dateSource) ? $dateSource : false;

if ($reference_off) return;

if (!$hiddenFields) $hiddenFields = "type";
else {
 if (!is_array($hiddenFields)) $hiddenFields = explode(",",$hiddenFields);
 if (!in_array("type",$hiddenFields)) $hiddenFields[]="type";
 $hiddenFields = implode(",",array_unique($hiddenFields));
}

if(!class_exists("refHandle")) {
 class refHandle {
  var $localRef,$inited,$debug;

  function __construct($parameters = array()) {
   $parameters = array_merge_recursive(
    array(
     "initName" => "type", // Ключ ресурса, значение которого вернуть в момент инициализации
     "fields" => "*",
     "tvfields" => array(),
     "symlinks" => array("title"=>"pagetitle","introtext"=>"introtext"),
    ),is_array($parameters)?$parameters:array()
   );
   foreach ($parameters as $k => $v) $this->$k = $v;
  }

  function init ($resource=false) {
   if ($this->localRef($resource)) {
    $this->inited = time();
    if (!empty($this->yams_id)) {
     foreach (explode(",", "content,introtext,pagetitle,description,longtitle,menutitle") as $field)
      if (!in_array($field . "_" . $this->yams_id, $this->tvfields))
       $this->tvfields[] = $field . "_" . $this->yams_id;
    }
    foreach (array_keys($resource) as $k) {
     if (isset($resource["tv".$k])) $this->tvfields[]=$k;
    }
    $this->resource($resource,"Init");
   }
   return $resource[$this->initName];
  }
  function resource($resource,$debug = false) {
   global $modx;
   if ($this->debug) {
    print $this->inited." ".$debug." Get resource";
//   print_r($resource);
//   print_r($this->tvfields);
   }
   if ( $this->localRef($resource) ) {
    if ($RealResource = $modx->getDocument($resource["content"],$this->fields) ) {
     $this->resource = $RealResource;
     foreach($this->symlinks as $k => &$v) {
      if (!empty($this->yams_id) and in_array($v."_".$this->yams_id,$this->tvfields)) $v = $v."_".$this->yams_id;
      if ($k!=$v) $this->resource[$k] =& $this->resource[$v];
     }
     if (is_array($tvs = $modx->getTemplateVars($this->tvfields,"name",$resource["content"]))) {
      foreach($tvs as $tv) {
       $this->resource[$tv["name"]] = $tv["value"];
       $this->resource["tv".$tv["name"]] =& $this->resource[$tv["name"]];
      }
     }
     if (!empty($this->dateSource) and !empty($this->dateFormat)) {
      $this->resource["date"] = strftime($this->dateFormat,$this->resource[$this->dateSource]!="0"?$this->resource[$this->dateSource]:$this->resource["createdon"]);
     }
    }
   } else {
    unset($this->resource);
   }
  }

  function localRef($resource=false) {
   if (!$resource && $this->resource) $resource =& $this->resource;
   if (!$resource) return false;
   return $this->localRef = strtolower($resource["type"])=="reference" and is_numeric($resource["content"]);
  }

  function setData($placeholders) {

   if (!$this->inited) $this->init($placeholders,"Init on all placeholders"); // после yams в  [+content+] может быть не то что нужно
   if ($this->localRef and $this->resource and is_array($this->resource)) {
    $placeholders = array_merge($placeholders,$this->resource);
   }
   return $placeholders;
  }
 }
}


$refHandle = new refHandle(array(
 "yams_id" => $yams_id,
 "dateSource" => $dateSource,
 "dateFormat" => $dateFormat,
 "debug" => isset($debug)?$debug:false,
 "tvfields" => isset($tvfields)?explode(",",$tvfields):array(),
));


$placeholders['type'] = array("*",array($refHandle,"init"));
$placeholders['*'] = array($refHandle,"setData"); // need patch ditto.inc in check folders on 436 line: to condition "and is_string($source)"

?>