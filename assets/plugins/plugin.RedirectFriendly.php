<?php
if (!defined('MODX_BASE_PATH')) die('HACK???');

/**
	* RedirectFriendly
	*
	* 301 Редирект с вложенных и наоборот ссылок (полезен при переключении настройки <b>Использовать вложенные URL</b>) 
	*
	* @license     GNU General Public License (GPL), http://www.gnu.org/copyleft/gpl.html
	* @author      MrSwed <webmaster@sdcollection.com>
	* @version     0.1
	* @internal    @events         OnPageNotFound
	* @internal    @properties
	*/

global $modx;
$q = preg_replace('@' . $modx->config["friendly_url_suffix"] . '$@', '', $_REQUEST['q']);
$tmp = explode('/', $modx->db->escape($q));
$alias = end($tmp);
$query = explode("?",$_SERVER["REQUEST_URI"],2);
$query = !empty($query[1])?$query[1]:''; 
$rs = $modx->db->select('id', $modx->getFullTableName('site_content'), "alias='{$alias}'".($_SESSION['mgrRole']!=1?" and deleted=0 and published=1":""));
$id = $modx->db->getValue($rs);

if ($id) {
	$url = $modx->makeUrl($id,'',$query);
	$modx->sendRedirect($url, 0, 'REDIRECT_HEADER', 'HTTP/1.1 301 Moved Permanently');
	exit();
}