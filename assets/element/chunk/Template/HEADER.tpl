<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>[*meta_title:ifempty=`[*longtitle:ifempty=`[*pagetitle*]`*] - [*parent:isnot=`0`:then=`[[getDocumentField? &id=`[*parent*]`]] - `*][(site_name)]`:striptags*]</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	[!is_mobile? &out=`<meta name="viewport" content="initial-scale=1.0">`!]
	<meta name="description" content="[*meta_description:specialchar*]"/>
	<meta name="keywords" content="[*meta_keywords:specialchar*]"/>
	<base href='/'/>
	<script src="/assets/js/jquery-1.9.0-min.js" type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript" src="/assets/js/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="/assets/js/fancybox/jquery.fancybox.js"></script>
	<script type="text/javascript" src="/assets/js/fancybox/helpers/jquery.fancybox-buttons.js"></script>
	<script type="text/javascript" src="/assets/js/fancybox/helpers/jquery.fancybox-media.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/js/fancybox/jquery.fancybox.css" media="screen"/>
	<link rel="stylesheet" type="text/css" href="/assets/js/fancybox/helpers/jquery.fancybox-buttons.css" media="screen"/>
	<link rel="stylesheet" type="text/css" href="/assets/js/fancybox/helpers/jquery.fancybox-thumbs.css" media="screen"/>
	<script src="/assets/templates/design/js/logic.js" type="text/javascript" charset="utf-8"></script>
	<link href="/assets/templates/design/style.css" rel="stylesheet" type="text/css"/>
	<link href="/assets/templates/design/ie.css" rel="stylesheet" type="text/css"/>

	[*head*]
</head>

<body [[getInheritField? &id=`[*id*]` &field=`bodyclass` &out=` class="%s"`]]>
<!--[if lte IE 9 ]>

<style>
	body {
		opacity: 1 !important;
		background: white !important;
	}
	body > * {
		display: none
	}
</style>
<div style="font-size:30px;text-align:center;padding:10em;display:block">
	Интернет Эксплорер ниже 11-й версии не поддерживается <br>
	Обновите Браузер. Или воспользуйтесь алтернативными.
</div>
<![endif]-->
<div class="main">{{debug_maket}}
	<div class="header">
		<a href="/" class="logo">[(site_name)]</a>
		<div class="search">
			{{HeaderSearchForm}}
		</div>
		<div class="menu">
			[[Wayfinder? &startId=`0` &level=`2` &useWeblinkUrl=1 &where=`isfolder = 1 or parent = 0 `]]
		</div>
	</div>
