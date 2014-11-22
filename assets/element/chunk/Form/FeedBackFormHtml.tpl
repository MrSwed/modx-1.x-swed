<div class="form vertical">
<div class="message">[+validationmessage+]</div>
<form action="[~[*id*]~]?review=1" method="post">
 <input type="hidden" name="formid" value="FeedBackForm" />
 <span style="display:none"><input type="text" name="veridata" eform="&nbsp;:date:0::#REGEX /^$/" value=""/></span>
 <label for="name" class=" required"><input type="text" id="name" value="[+name+]" name="name" placeholder="Ваше имя" eform="Ваше имя::1"></label>
  <label for="email" class=" required"><input type="text" id="email" value="[+email+]" name="email" placeholder="Email"  eform="E-Mail:email:1" /></label>
  <label for="phone" class=""><input type="text" id="phone" value="[+phone+]" name="phone" placeholder="Телефон"  eform="Телефон::0" /></label>
  <label for="notes" class=" required"><textarea id="notes" name="notes" placeholder="Сообщение"  eform="Сообщение::1">[+notes+]</textarea></label>
  <label for="vericode" >
   <span class="required"><input type="text" name="vericode" size="20" id="vericode" autocomplete="off" placeholder="Введите код "/></span>
   <img src="[+verimageurl+]" alt="Код проверки" class="noborder" /></label>
  <div > Обязательные поля отмечены <span class="red">*</span>
  <input type="submit" value="Отправить"></div>
</form>

</div>
