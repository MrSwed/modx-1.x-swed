/**
 * HEADER
 * 
 * Верхняя часть дизайна 
 * 
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Шаблоны
 * @internal    @installset base, sample
 */
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <title>[*meta_title:ifempty=`[*longtitle:ifempty=`[*pagetitle*] - [*parent:isnot=`0`:then=`[!getDocumentField? &id=`[*parent*]`!] - `*][(site_name)]`*]`*]</title>
 <meta name="description" content="[*meta_description:specialchar*]" />
 <meta name="keywords" content="[*meta_keywords:specialchar*]" />
 <base href='[(site_url)]' />
 <script src="/js/jquery-1.9.0-min.js" type="text/javascript" charset="utf-8"></script>

 <script type="text/javascript" src="/js/jquery.mousewheel.js"></script>
 <script type="text/javascript" src="/js/fancybox/jquery.fancybox.js"></script>
 <script type="text/javascript" src="/js/fancybox/helpers/jquery.fancybox-buttons.js"></script>
 <script type="text/javascript" src="/js/fancybox/helpers/jquery.fancybox-media.js  "></script>
 <script type="text/javascript" src="js/fancybox/helpers/jquery.fancybox-thumbs.js "></script>
 <link rel="stylesheet" type="text/css" href="/js/fancybox/jquery.fancybox.css" media="screen"/>
 <link rel="stylesheet" type="text/css" href="/js/fancybox/helpers/jquery.fancybox-buttons.css" media="screen"/>
 <link rel="stylesheet" type="text/css" href="/js/fancybox/helpers/jquery.fancybox-thumbs.css " media="screen"/>
 <script src="/js/logic.js" type="text/javascript" charset="utf-8"></script>
 <link href="/design/style.css" rel="stylesheet" type="text/css"/>
 <base href="/" />

 <!--[if lte IE 8 ]>
 <link rel="stylesheet" type="text/css" href="/design/ie8.css"/>
 <![endif]-->
</head>

<body>
<!--[if lte IE 7 ]>
<style>
 .main, .footer {
  display: none
 }
</style>
<div style="font-size:30px;text-align:center;padding:10em">
 Обновите Браузер. Интернет Эксплорер ниже 8-й версии не поддерживается
</div>
<![endif]-->
