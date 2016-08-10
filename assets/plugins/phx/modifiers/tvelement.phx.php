<?php

/* 
 * description: Get an element(s) names of tv select value 
 * ( for tv type dropdown, listbox, listbox-multiple,checkbox with possible values like "Option name==option_value||Yes==1||No==2||So So==so-so")
 *  
 * usage: [+docid:tvelement=`<tvname>[[:<value by ||>]:[<out format %n %v>]:<out delimiter>]`+]
 *  <tvname>           - string, name of tvvalue
 *  <value>           - set custom tv value, not docid value of TV. Standard delimiters ||, Set '*' or '*all*' to get all select 
 *  <out format %n %v> - set output format, use %v for value and %n for names, Default is "%n" delimited by comma
 *  <out delimiter>    - for multi results, comma default if no out format specified
 * Examples:
 *  [*docid:tvelement=`tvaname`*] -  
 *  [*docid:tvelement=`tvaname:value1`*]                                        - get name for custom value
 *  [*docid:tvelement=`tvaname::<value>%v</value><name>%n</name>`*]             - formatted
 *  [*docid:tvelement=`tvaname:::;`*]                                           - standard output delimited by ";"
 *  [*docid:tvelement=`tvaname::<value>%v</value><name>%n</name>`:<br/>*]       - delim formatted output by <br/>
 *  [+phx:input=`[*id*]`:tvelement=`tvaname::<div class="%v">%n</div>`+]        - using phx input for current doc. output div class by value
 * 
 * author MrSwed <webmaster@sdcollection.com>
*/

$tvTypeCheck = explode(",","dropdown,listbox,listbox-multiple,checkbox");
if (!empty($options)) {
 $options = str_replace($this->safetags[1],$this->safetags[2],$options);
 $options = explode(":",$options);
}  else return "";

$o = array(
 "field"    => !empty($options[0]) ? $options[0] : FALSE,
 "tvData"   => $modx->getTemplateVar($options[0], '*', $output, 1),
 "value"    => !empty($options[1]) ? $options[1] : '',
 "out"      => !empty($options[2]) ? $options[2] : '%n',
 "outDelim" => !empty($options[3]) ? $options[3] : (!empty($options[2]) ? '' : ','),
 "outAr"    => array()
);
if (!$o["value"]) $o["value"] = $o["tvData"]["value"];
if (!is_array($o["value"])) $o["value"] = explode("||", $o["value"]);
if (!in_array($o["tvData"]["type"],$tvTypeCheck)) return $o["tvData"]["type"]." - type not supported ";
$ar = explode("||",$o["tvData"]["elements"]);
$o["tvData"]["elementsAr"] = array();
foreach ($ar as $vs) {
 list($n,$v) = explode("==",$vs,2);
 $o["tvData"]["elementsAr"][$v] = $n;
 if (in_array($v,$o["value"])) $o["outAr"][] = str_replace(array("%v","%n"),array($v,$n),$o["out"]);
}
if (!$o["outAr "]&& preg_match("/^\*$|[\W\D]+all[\W\D]+/",$o["value"][0])) {
 foreach ($o["tvData"]["elementsAr"] as $v => $n) {
  $o["outAr"][] = str_replace(array("%v","%n"),array($v,$n),$o["out"]);
 }
}
return implode($o["outDelim"],$o["outAr"]);