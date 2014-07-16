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
  	  <h2>Профбюро</h2>  <!-- название менюшки-->
        <article class="right_menu">
		  <a href="profburo.php?link=sostav">Состав профбюро</a>
		  <a href="profburo.php?link=pamyatka">Памятка профорга группы</a>
		  <a href="profburo.php?link=matpom">Порядок оформления материальной помощи</a>
		  <a href="profburo.php?link=form">Бланки заявлений</a>
        </article> 	
	</section>
  </aside>
  <div id="container">
    <div id="content">
      <section>
	    <?php
	
	    if (isset($_GET['link']))
			{if (file_exists('blocks/profburo/'.$_GET['link'].'.php'))
				{include('blocks/profburo/'.$_GET['link'].'.php');}
				else{include('blocks/404.php');}}
			else{include('blocks/profburo/sostav.php');}
		
		?>
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
