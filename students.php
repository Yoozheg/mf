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
    <section>
  	  <h2>Студентам</h2>  <!-- название менюшки-->
        <article class="right_menu">
		  <a href="students.php?link=info">Инфорамция о деканате</a>
		  <a href="students.php?link=sostav">Состав деканата</a>
		  <a href="http://raspisanie.rusoil.net" target="_blank">Расписание</a>
		  <a href="students.php?link=kuratory">Список кураторов</a>
		  <a href="students.php?link=portfolio">"Портфолио" студента</a>
        </article> 	
	</section>
  </aside>
  <div id="container">
    <div id="content">
      <section>
	    <?php
	
	    if (isset($_GET['link']))
			{if (file_exists('blocks/students/'.$_GET['link'].'.php'))
				{include('blocks/students/'.$_GET['link'].'.php');}
				else{include('blocks/404.php');}}
			else{include('blocks/students/info.php');}
		
		?>
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
