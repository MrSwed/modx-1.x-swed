/**
 * messageForm
 * 
 * Пример формы сообщения с сайта
 * 
 * @category	chunk
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal @modx_category Forms
 * @internal    @installset base, sample
 */
<div class="messageForm">
<div class="message">[+validationmessage+]</div>
<form action="[~[*id*]~]?review=1" method="post">
 <input type="hidden" name="formid" value="messageForm" />
 <table border="0" >
  <tbody>
   <tr>
    <th><label for="name">Ваше имя:</label></th>
    <td ><input type="text" id="name" value="[+name+]" name="name" eform="Ваше имя::0"></td>
   </tr>
   <tr>
    <th><label for="email">E-Mail:</label></th>
    <td><input type="text" id="email" value="[+email+]" name="email" eform="E-Mail:email:0"></td>
   </tr>
   <tr>
    <th><label for="notes"><sup>*</sup> Сообщение:</label></th>
    <td><textarea id="notes" name="notes" eform="Сообщение::1">[+notes+]</textarea></td>
   </tr>
   <tr>
    <th><label for="vericode"><sup>*</sup>Введите код:</label></th>
    <td>
    <input type="text" name="vericode" size="20" id="vericode" autocomplete="off" /> <br />
    <img src="[+verimageurl+]" alt="Код проверки" class="noborder" />
   </td>
  </tr>
  <tr>
   <td><sup>*</sup> Обязательные поля</td>
   <td><input type="submit" value="Отправить"></td>
  </tr>
 </tbody>
</table>
</form>

</div>
