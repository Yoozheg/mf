<!DOCTYPE html>
<?php include('blocks/db.php');
?>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="style.css" />
  <link rel="icon" type="image/png" href="favicon.png" />
  <script src="xjsl.js"></script>
  <script src="script.js"></script>
  <title>Механический факультет УГНТУ</title>
</head>
<body id="home">

<div>
<?php include('blocks/header.php');  //подключаем ШАПКУ и ГЛАВНОЕ МЕНЮ
?> 
 
<div id="wrap">
  <aside>
    <?php include('blocks/grid.php'); //подключаем большие КНОПКИ В МЕТРО СТИЛЕ
	?>
    <section>
      <h2>Полезные ссылки</h2>  <!-- название менюшки-->
        <article class="rightMenu">
	      <a href="http://минобрнауки.рф/" target="_blank">Министерство образования РФ</a>
          <a href="http://www.morb.ru/" target="_blank">Министерство образования РБ</a>
          <a href="http://www.bashneft.ru/" target="_blank">ОАО АНК "Башнефть"</a>
          <a href="http://www.lukoil.ru/" target="_blank">ОАО "Лукойл"</a>
          <a href="http://www.vnzm.ru/" target="_blank">ОАО "АК ВНЗМ"</a>
		  <a href="http://raspisanie.rusoil.net" target="_blank">Расписание занятий</a>
	    </article> 	
    </section>
  </aside>
  <div id="container">
    <div id="feature">
	  <img src="img/feature1.jpg"/>
      <div id="featureBottomButtons"></div>
	  <div id="featureCenterButtons">
	    <button class="featureButtonLeft">&nbsp;</button>
	    <button class="featureButtonRight">&nbsp;</button>
	  </div>
    </div>
    <div id="content">
      <section>
	    <h2>Новости</h2>
	      <?php /* РАСКОМЕНТИТЬ ЧТОБЫ НОВОСТИ ТЯНУЛИСЬ ИЗ БД (не забудь подогнать под новый формат новостей)
		  $query = mysql_query('SELECT * FROM `news-general` ORDER BY `time` DESC LIMIT 10');
	      $length = mysql_num_rows($query);
	      for($i = 0; $i < $length; ++$i){
	        $header = mysql_result($query,$i,"header");
	        $time = mysql_result($query,$i,"time");
	        $short = mysql_result($query,$i,"short");
	        $full = mysql_result($query,$i,"full");
			echo('<a href="#" class="news" onClick="showNews(1);"><h3>'.$header.'</h3><p class="newsPosted">Posted <span>'.$time.'</span></p><p class="newsShortText">'.$short.'</p></a>');
	        }
			*/
		  ?>
		  <!-- Удалить ниже, если тянуть новости из БД -->
		   <a href="#" class="news" onClick="showNews(1);"><p class="newsPosted">Posted <span>10.10.2010</span></p><h3>Вручение дипломов</h3><p class="newsShortText">
				<p class="center"><b>Вниманию выпускников МФ!</b></p>
				<p class="center">25 июня (среда) состоится вручение дипломов по следующему графику:<br />
				- 11:30, Дворец Молодежи УГНТУ (корпус №8), дипломы с отличием (красные дипломы);<br />
				- 16:00, конференц-зал корпуса №1, дипломы без отличия (синие дипломы).
				<img src="img/news/1.jpg" height="200px"/></p>	
		  </p></a>
		  <a href="#" class="news" onClick="showNews(1);"><p class="newsPosted">Posted <span>10.10.2010</span></p><h3>Сайт в разработке</h3><p class="newsShortText">В настоящий момент сайт находится в разработке. Все ссылки кликабельны.</p></a>
		 </article>
	   
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
