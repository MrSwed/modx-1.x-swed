<?php
/*
 * usage: [+string:urlencode+]
 * usage: [+string:urlencode=`http://blablabla`+]
 */

if (empty($output)) {
	$output = $options;
}
return urlencode($output);
