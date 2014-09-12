<?PHP
$year = date('Y'); //возвращает номер года
$spt = date('W', mktime(0, 0, 0, 9, 1, $year-1)); //возвращает номер недели 1.09 предыдущего года
$spt_now = date('W', mktime(0, 0, 0, 9, 1, $year)); //возвращает номер недели 1.09 этого года
$dec = date('W', mktime(0, 0, 0, 12, 29, $year-1)); //возвращает номер недели 31.12 предыдущего года. смотри чтобы это была именно последняя полная неделя в прошлом году. 
$day = date('w', mktime(0, 0, 0, 9, 1, $year-1)); //определение дня недели 1.09 предыдущего года
$now = date('W'); //возвращает номер недели
if (($day = 0) or ($day = 6)) //определение поправки, если 1.09 нулевая неделя
	{$koef = 0;}
	else {$koef = 1;}; 
	
if ($now >= $spt_now) //если сейчас номер недели больше номера недели 1.09 этого года
	{$weeks = $now-$spt_now+$koef+1;}
	else {$weeks = $dec-$spt+$koef+$now+1;};
//echo '<div style="text-align: right; color: #fff;">Идет <b>'.$weeks.'</b> учебная неделя</div>';//-1 только для 2012-2013 уч.г. и 2013-2014уч.г.
?>
<div id="grid">
 <a href="http://www.rusoil.net" target="_blank" class="ugntu">УГНТУ</a> 
 <a href="http://profstud.rusoil.net/" target="_blank" class="profkom">Профком</a>
 <a href="#" class="week">Неделя<div><?php echo $weeks;?></div></a>
 <a href="http://vk.com/mf_ugntu" target="_blank" class="vk">vkontakte</a>
</div> 
