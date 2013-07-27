/**
 * domain
 * 
 * Имя домена сайта 
 * 
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Utils
 * @internal    @installset base, sample
 */
[+phx:input=`[(site_url)]`:pregreplace=`/(http:|\/)/`+]