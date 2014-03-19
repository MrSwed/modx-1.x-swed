<?php

list($decimals,$dec_point,$thousands_sep) = explode("|",$options,3);
if (!$decimals) $decimals = 2;
if (!$dec_point) $dec_point = ".";

return number_format($output,$decimals,$dec_point,$thousands_sep);

?>