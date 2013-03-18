/**
 * ditto_a
 * 
 * Шаблон Ditto с использование атрибутов ссылки (class="class_name") и установки класса active если текущий id элемента равен id текущего документа или родительского
 * 
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Ditto
 * @internal    @installset base, sample
 */
<a [+phx:if=`[+id+]`:is=`[*id*]`:or:is=`[*parent*]`:then=`[+link_attributes:pregreplace=`/class=['"]([^'"]+)['"]/||class="\1 active"`+]`:else=`[+link_attributes+]`+]  href="[(site_url)][~[+id+]~]" title="[+longtitle:ifempty=`[+pagetitle+]`+]">[+pagetitle+]</a>
