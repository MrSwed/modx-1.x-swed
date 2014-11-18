<?php
$parId = isset($parId) ? $parId: 1;
//Возвращаем ID дочерних документов с уровнем вложенности 1
return implode(',', $modx->getChildIds($parId, 1));
?>