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
		 <thead>
		  <tr>
		   <td colspan="7" class="month"><div class="buttonLeft"></div>Сентябрь<div class="buttonRight"></div></td>
		  </tr>
		 </thead>
		 <tbody>
		  <tr>
		   <td>Пн.</td><td>Вт.</td><td>Ср.</td><td>Чт.</td><td>Пт.</td><td>Сб.</td><td>Вс.</td>
		  </tr>
		  <tr>
		   <td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td>
		  </tr>
		  <tr>
		   <td>8</td><td>9</td><td class="now">10</td><td>11</td><td>12</td><td>13</td><td>14</td>
		  </tr>
		  <tr>
		   <td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td>
		  </tr>
		  <tr>
		   <td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td>
		  </tr>
		  <tr>
		   <td>29</td><td>30</td><td>31</td><td></td><td></td><td></td><td></td>
		  </tr>
		 </tbody>
		</table>
		
	  </section>
     </div>
  </div>
</div>


<?php include('blocks/footer.php') //подключаем ФУТЕР
?>

</div>

</body></html>
