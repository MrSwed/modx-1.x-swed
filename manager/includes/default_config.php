<?php

$c  = &$settings;

$c['site_name']                = 'My MODX Site';
$c['site_start']               = 1;
$c['error_page']               = 1;
$c['unauthorized_page']        = 1;
$c['site_unavailable_page']    = '';
$c['top_howmany']              = 10;
$c['custom_contenttype']       = 'application/rss+xml,application/pdf,application/vnd.ms-word,application/vnd.ms-excel,text/html,text/css,text/xml,text/javascript,text/plain,application/json';
$c['docid_incrmnt_method']     = 0;
$c['valid_hostnames']          = '';
$c['enable_filter']            = 0;
$c['minifyphp_incache']        = 0;
$c['rss_url_news']             = $_lang["rss_url_news_default"];
$c['rss_url_security']         = $_lang["rss_url_security_default"];
$c['friendly_urls']            = 1;
$c['friendly_url_prefix']      = '';
$c['friendly_url_suffix']      = '.html';
$c['friendly_alias_urls']      = '1';
$c['use_alias_path']      = '1';
$c['make_folders']             = '0';
$c['seostrict']                = '0';
$c['aliaslistingfolder']       = '0';
$c['check_files_onlogin']      = "index.php\n.htaccess\nmanager/index.php\nmanager/includes/config.inc.php";
$c['use_captcha']              = 0;
$c['pwd_hash_algo']            = 0;
$c['rb_base_url']              = 'assets/';
$c['resource_tree_node_name']  = 'pagetitle';
$c['udperms_allowroot']        = 0;
$c['failed_login_attempts']    = 3;
$c['blocked_minutes']          = 10;
$c['error_reporting']          = '1';
$c['send_errormail']           = '0';
$c['enable_bindings']          = 1;
$c['captcha_words']            = $_lang["captcha_words_default"];
$c['emailsender']              = 'you@example.com';
$c['smtp_host']                = 'smtp.example.com';
$c['smtp_port']                = 25;
$c['smtp_username']            = $c['emailsender'];
$c['emailsubject']             = $_lang["emailsubject_default"];
$c['signupemail_message']      = $_lang["system_email_signup"];
$c['websignupemail_message']   = $_lang["system_email_websignup"];
$c['webpwdreminder_message']   = $_lang["system_email_webreminder"];
$c['warning_visibility']       = 1;
$c['tree_page_click']          = 27;
$c['use_breadcrumbs']          = 1;
$c['remember_last_tab']        = 0;
$c['tree_show_protected']      = 0;
$c['show_meta']                = 0;
$c['datepicker_offset']        = -10;
$c['number_of_logs']           = 100;
$c['mail_check_timeperiod']    = 60;
$c['number_of_messages']       = 40;
$c['number_of_results']        = 30;
$c['use_editor']               = 1;
$c['editor_css_path']          = '';
$c['filemanager_path']         = '[(base_path)]';
$c['upload_files']             = 'bmp,ico,gif,jpeg,jpg,png,psd,tif,tiff,fla,flv,swf,aac,au,avi,css,cache,doc,docx,gz,gzip,htaccess,htm,html,js,mp3,mp4,mpeg,mpg,ods,odp,odt,pdf,ppt,pptx,rar,tar,tgz,txt,wav,wmv,xls,xlsx,xml,z,zip,JPG,JPEG,PNG,GIF,svg';
$c['upload_images']            = 'bmp,ico,gif,jpeg,jpg,png,psd,tif,tiff,svg';
$c['upload_media']             = 'au,avi,mp3,mp4,mpeg,mpg,wav,wmv';
$c['upload_flash']             = 'fla,flv,swf';
$c['upload_maxsize']           = '5000000';
$c['new_file_permissions']     = '0644';
$c['new_folder_permissions']   = '0755';
$c['use_browser']              = 1;
$c['which_browser']            = 'mcpuk';
$c['rb_webuser']               = 0;
$c['rb_base_dir']              = '[(base_path)]assets/';
$c['clean_uploaded_filename']  = 1;
$c['strip_image_paths']        = 1;
$c['maxImageWidth']            = 1600;
$c['maxImageHeight']           = 1200;
$c['thumbWidth']               = 150;
$c['thumbHeight']              = 150;
$c['thumbsDir']                = '.thumbs';
$c['jpegQuality']              = 90;
$c['denyZipDownload']          = 0;
$c['denyExtensionRename']      = 0;
$c['showHiddenFiles']          = 0;
$c['session_timeout']          = 15;
$c['site_unavailable_message'] = $_lang['siteunavailable_message_default'];
$c['allow_eval']               = 'with_scan';
$c['safe_functions_at_eval']   = 'time,date,strtotime,strftime';
$c['track_visitors']           = '0';
$c['use_udperms']              = '1';
$c['email_method']             = 'mail';
$c['smtp_auth']                = '0';
$c['which_editor']             = 'TinyMCE4';
$c['auto_menuindex']           = '1';
$c['tinymce4_theme']           = 'full';
$c['validate_referer']         = '1';
$c['xhtml_urls']               = '1';
$c['allow_duplicate_alias']    = '0';
$c['automatic_alias']          = '1';
$c['datetime_format']          = 'dd-mm-YYYY';
$c['cache_type']               = '2';
$c['server_protocol']          = 'http';
$c['settings_version']         = 0;
$c['server_offset_time']       = 0;
$c['default_template']         = 0;
$c['publish_default']          = '1';
$c['cache_default']            = '1';
$c['search_default']           = '1';
