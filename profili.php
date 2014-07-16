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
    <section class="profiliRightMenu">
  	  <h2>Профили обучения</h2>  <!-- название менюшки-->
        <article class="right_menu">
		 <a href="#bmp">Профиль БМП</a>
		 <a href="#bma">Профиль БМА</a>
		 <a href="#bkz">Профиль БКЗ</a>
		 <a href="#bms">Профиль БМС</a>
		 <a href="#bmz">Профиль БМЗ</a>
		 <a href="#bmr">Профиль БМР</a>
		 <a href="#bpb">Профиль БПБ</a>
		 <a href="#bchs">Профиль БЧС</a>
        </article> 	
	</section>
  </aside>
  <div id="container">
    <div id="content">
      <section id='profili'>
	  <?php
	   include('blocks/profili.php');
	  ?>
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
