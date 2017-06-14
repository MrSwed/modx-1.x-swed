<?php
/*
 * usage: [+string:rawurlencode+]
 * usage: [+string:rawurlencode=`http://blablabla`+]
 */

if (empty($output)) {
	$output = $options;
}
return rawurlencode($output);
