$.ready(function(){
 createCalendar = function(month,year){
    var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
	function daysOfMonth(month,year){
		var monthDaysArr = [31,28,31,30,31,30,31,31,30,31,30,31];
		monthDaysArr[1] = (year % 4 == 0) ? 29 : 28;
		return monthDaysArr[month];
		}
	$('#calendar').clear().add('thead').html('<tr><td colspan="7" class="month"><div class="buttonLeft"></div>'+monthName[month]+' '+year+'<div class="buttonRight"></div></td></tr>');
	$('#calendar').add('tbody').html('<tr><td>Пн.</td><td>Вт.</td><td>Ср.</td><td>Чт.</td><td>Пт.</td><td>Сб.</td><td>Вс.</td></tr>');
	var monthDays = daysOfMonth(month,year);
	var firstDay = new Date(year,month,1).getDay();
	firstDay = (firstDay == 0) ? 7 : firstDay;
	var i = 1;
	while (i<=monthDays){
		$('#calendar tbody').add('tr');
		var tr = $(['#calendar tbody tr']);
		var length = tr.length()-1;
		if (length == 1) {
			for(var j = 1;j<firstDay;j++){
					tr.q(length).add('td');
					}
			for(var j = firstDay;j<=7;j++){
					tr.q(length).add('td').html(i++);
					}
			}else{
				for(var j = 1;j<=7;j++){
					if (i<=monthDays){
						tr.q(length).add('td').html(i++);
						} else{
						tr.q(length).add('td');
						}
					}
				}
		}
	}
	

	
 var today = new Date();	
 createCalendar(today.getMonth(),today.getFullYear());
 
})


