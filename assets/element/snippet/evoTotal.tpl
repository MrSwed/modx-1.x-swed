<?php
$id = isset($id)?$id:$modx->documentIdentifier; //берем id текущей страницы
$out = isset($out)?$out:"%s";
$query = "SELECT count(`content_id`) FROM `modx_portfolio_galleries` where content_id='$id'" ;
//формируем запрос к базе
$res = mysql_query($query);
$row = mysql_fetch_array($res);
return (1 * $row[0] ? sprintf($out,$row[0]):"");

?>