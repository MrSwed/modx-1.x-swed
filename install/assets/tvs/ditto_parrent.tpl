/**
 * ditto_parrent
 *
 * Укажите раздел, дочерние эелементы которого нужно вывести
 *
 * @category        tv
 * @name            ditto_parrent
 * @internal        @caption Другой раздел для отображения дочерних
 * @internal        @input_type dropdown
 * @internal        @input_options @EVAL  function getItems($p, $l=0){  global $modx;  $c=array();  foreach($modx->getDocumentChildren($p,1,0,"id,pagetitle","isfolder=1") as $k) {   $c[] = str_pad("",$l*2,"-",STR_PAD_RIGHT)." ".$k['pagetitle']." (".$k['id'].")==".$k['id'];   $c = array_merge($c,getItems($k['id'],$l+1));  }  return $c; } return '||'.implode("||",getItems(0)); 
 * @internal        @input_default
 * @internal        @output_widget
 * @internal        @output_widget_params
 * @internal        @lock_tv 0
 * @internal        @template_assignments Основной
 * @internal        @modx_category Параметры
 * @internal        @installset sample
 */