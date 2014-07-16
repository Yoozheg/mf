<!DOCTYPE html>
<?php include('blocks/db.php');
?>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="style.css" />
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
        <article class="right_menu">
          <a href="#">Банк рефератов</a>
	      <a href="#">Быстроденьги</a>
	      <a href="#">Министерство обороны</a>
	    </article> 	
    </section>
  </aside>
  <div id="container">
    <div id="feature">
	  <img />
      <div id="feature-bottom-buttons"></div>
	  <div id="feature-center-buttons">
	    <button class="feature-button-left">&nbsp;</button>
	    <button class="feature-button-right">&nbsp;</button>
	  </div>
    </div>
    <div id="content">
      <section>
	    <h2>Новости</h2>
	    <article class="news-general">
		  <h2>Общие новости</h2>
		  <?php /*                                                                        РАСКОМЕНТИТЬ ЧТОБЫ НОВОСТИ ТЯНУЛИСЬ ИЗ БД
		  $query = mysql_query('SELECT * FROM `news-general` ORDER BY `time` DESC LIMIT 10');
	      $length = mysql_num_rows($query);
	      for($i = 0; $i < $length; ++$i){
	        $header = mysql_result($query,$i,"header");
	        $time = mysql_result($query,$i,"time");
	        $short = mysql_result($query,$i,"short");
	        $full = mysql_result($query,$i,"full");
			echo('<a href="#" class="news" onClick="showNews(1);"><h3>'.$header.'</h3><p class="news_posted">Posted <span>'.$time.'</span></p><p class="news_short_text">'.$short.'</p></a>');
	        }
			*/
		  ?>
		  <!-- Удалить ниже, если тянуть новости из БД -->
		   <a href="#" class="news" onClick="showNews(1);"><h3>Заголовок 1</h3><p class="news_posted">Posted <span>10.10.2010</span></p><p class="news_short_text">Описание новости</p></a>
		  <a href="#" class="news" onClick="showNews(1);"><h3>Заголовок 2</h3><p class="news_posted">Posted <span>10.10.2010</span></p><p class="news_short_text">Мохаммед Али - американский боксёр-профессионал, выступавший в тяжёлой весовой категории; один из самых известных и узнаваемых спортсменов в истории.</p></a>
		 </article>
	    <article class="news-profburo">
		  <h2>Новости профбюро</h2>
		    <?php /*                                                                        РАСКОМЕНТИТЬ ЧТОБЫ НОВОСТИ ТЯНУЛИСЬ ИЗ БД
			$query = mysql_query('SELECT * FROM `news-profburo` ORDER BY `time` DESC LIMIT 10');
	        $length = mysql_num_rows($query);
	        for($i = 0; $i < $length; ++$i){
	         $header = mysql_result($query,$i,"header");
	         $time = mysql_result($query,$i,"time");
	         $short = mysql_result($query,$i,"short");
	         $full = mysql_result($query,$i,"full");
			 echo('<a href="#" class="news" onClick="showNews(1);"><h3>'.$header.'</h3><p class="news_posted">Posted <span>'.$time.'</span></p><p class="news_short_text">'.$short.'</p></a>');
	         } */
			?>
			 <a href="#" class="news" onClick="showNews(1);"><h3>Заголовок 1</h3><p class="news_posted">Posted <span>10.10.2010</span></p><p class="news_short_text">Описание новости</p></a>
		   <a href="#" class="news" onClick="showNews(1);"><h3>Заголовок 2</h3><p class="news_posted">Posted <span>10.10.2010</span></p><p class="news_short_text">Мохаммед Али - американский боксёр-профессионал, выступавший в тяжёлой весовой категории; один из самых известных и узнаваемых спортсменов в истории.</p></a>
		   
		  </article>
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
