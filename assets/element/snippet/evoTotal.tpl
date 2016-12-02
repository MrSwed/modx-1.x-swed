<?php
$id = isset($id)?$id:$modx->documentIdentifier; //берем id текущей страницы
$out = isset($out)?$out:"%s";
//формируем запрос к базе
$res = $modx->db->select("count(`content_id`)",$modx->getFullTableName('portfolio_galleries'),"content_id='{$id}'");
$row = $modx->db->getRow($res,'both');
return (1 * $row[0] ? sprintf($out,$row[0]):"");

?>