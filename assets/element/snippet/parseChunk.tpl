<?php
 /**
 * parseChunk
 *
 * Вызов чанка с параметрами
 *
 * @category  parser
 * @version   0.1
 * @license     GNU General Public License (GPL), http://www.gnu.org/copyleft/gpl.html
 * @internal	@properties 
 * @internal	@modx_category Utils
 * @internal    @installset base, sample 
 * @return string распарсеный чанк
 * @author Agel_Nash <Agel_Nash@xaker.ru>
 * 
 */
# example [!parseChunk? &ChunkName=`form` &username=`Agel_Nash`!]

return isset($ChunkName) ? $modx->parseChunk($ChunkName, $modx->event->params,'[+','+]') : '';
