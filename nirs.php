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
    <section>
  	  <h2>НИРС</h2>  <!-- название менюшки-->
        <article class="rightMenu">
		  <a href="nirs.php?link=olimp">Олимпиады</a>
		  <a href="nirs.php?link=konf">Конференции</a>
        </article> 	
	</section>
  </aside>
  <div id="container">
    <div id="content">
      <section>
	    <?php
	
	    if (isset($_GET['link']))
			{if (file_exists('blocks/nirs/'.$_GET['link'].'.php'))
				{include('blocks/nirs/'.$_GET['link'].'.php');}
				else{include('blocks/404.php');}}
			else{include('blocks/nirs/olimp.php');}
		
		?>
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
