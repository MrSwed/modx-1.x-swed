<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<title>[*meta_title:ifempty=`[*longtitle:ifempty=`[*pagetitle*]`*] - [*parent:isnot=`0`:then=`[[getDocumentField? &id=`[*parent*]`]] - `*][(site_name)]`:striptags*]</title>
	[!is_mobile? &out=`<meta name="viewport" content="initial-scale=1.0">`!]
	<meta name="description" content="[*meta_description:specialchar*]"/>
	<meta name="keywords" content="[*meta_keywords:specialchar*]"/>
	<meta name="generator" content="Core CMS">
	<base href='/'/>
	<script src="/assets/js/jquery-1.9.0-min.js"></script>

	<script src="/assets/js/jquery.mousewheel.js"></script>
	<script src="/assets/js/fancybox/jquery.fancybox.js"></script>
	<script src="/assets/js/fancybox/helpers/jquery.fancybox-buttons.js"></script>
	<script src="/assets/js/fancybox/helpers/jquery.fancybox-media.js"></script>
	<link href="/assets/js/fancybox/jquery.fancybox.css" media="screen"/>
	<link href="/assets/js/fancybox/helpers/jquery.fancybox-buttons.css" media="screen"/>
	<link href="/assets/js/fancybox/helpers/jquery.fancybox-thumbs.css" media="screen"/>
	<script src="/assets/templates/design/js/logic.js"></script>
	<link href="/assets/templates/design/style.css"/>
	<link href="/assets/templates/design/ie.css"/>

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
{{debug_maket}}
	<header class="header">
				<figure><a href="/" class="logo">[(site_name)]</a></figure>
				<div class="contacts">
					[[ShowBlock? &name=`tplHeaderContacts` &id=`1` &out=`%s`]]
				</div>
			<menu>
				[[Wayfinder? &startId=`0` &level=`2` &useWeblinkUrl=1 &rowTpl=`menurow` ]]
			</menu>
			[[ShowBlock? &name=`headerPlace` ]]
	</header>
