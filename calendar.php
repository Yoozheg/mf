<!DOCTYPE html>
<?php include('blocks/db.php');
?>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="style.css" />
  <script src="xjsl.js"></script>
  <script src="script.js"></script>
  <script src="calendar.js"></script>
  <title>Механический факультет УГНТУ</title>
</head>
<body id="home">

<div>
<?php include('blocks/header.php');  //подключаем ШАПКУ и ГЛАВНОЕ МЕНЮ
?> 
 
<div id="wrap">
  <aside>
    <section>
  	  <h2>Полезные ссылки</h2>  <!-- название менюшки-->
        <article class="rightMenu">
	      <a href="http://минобрнауки.рф/" target="_blank">Министерство образования РФ</a>
          <a href="http://www.morb.ru/" target="_blank">Министерство образования РБ</a>
          <a href="http://www.bashneft.ru/" target="_blank">ОАО АНК "Башнефть"</a>
          <a href="http://www.lukoil.ru/" target="_blank">ОАО "Лукойл"</a>
          <a href="http://www.vnzm.ru/" target="_blank">ОАО "АК ВНЗМ"</a>
	    </article> 	
	</section>
  </aside>
  <div id="container">
    <div id="content">
      <section>
		<h2>Календарь</h2>
	    <table id="calendar">
	
		</table>
		
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
