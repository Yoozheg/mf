

$.ready(function(){
 var today = new Date();
 
 
 createCalendar = function(month,year){
    var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
	var firstDay = new Date(year,month,1).getDay();
	firstDay = (firstDay == 0) ? 7 : firstDay;
	function daysOfMonth(month,year){
		var monthDaysArr = [31,28,31,30,31,30,31,31,30,31,30,31];
		monthDaysArr[1] = (year % 4 == 0) ? 29 : 28;
		return monthDaysArr[month];
		}
	function searchDay(day){ /*ПЕРЕПИИСАТЬ С УЧЕТОМ ДОБАВЛЕННЫХ ЯЧЕЕК С НЕДЕЛЯМИ*/
		 searchDayOfWeek = new Date(year,month,day).getDay();
		 return $(['#calendar tbody tr']).q(parseInt((day+firstDay-2)/7)+1).find(['td']).q(searchDayOfWeek);
	}	
	$('#calendar').clear().add('thead').html('<tr><td colspan="8" class="month"><div id="buttonLeft"></div>'+monthName[month]+' '+year+'<div id="buttonRight"></div></td></tr>');
	$('#calendar').add('tbody').html('<tr><td class="week">Нед.</td><td>Пн.</td><td>Вт.</td><td>Ср.</td><td>Чт.</td><td>Пт.</td><td class="holyday">Сб.</td><td>Вс.</td></tr>');
	var monthDays = daysOfMonth(month,year);
	
	
	var i = 1;
	if (month<8){
		var firstWeekSeptFirst = new Date(year-1,8,1)
	} else{
		var firstWeekSeptFirst = new Date(year,8,1)
	}
	var firstWeekMonday = new Date(firstWeekSeptFirst.getFullYear(),firstWeekSeptFirst.getMonth()-1,31-firstWeekSeptFirst.getDay()+2)
	if (firstWeekSeptFirst.getDay() == 0) {firstWeekMonday = new Date(firstWeekSeptFirst.getFullYear(),firstWeekSeptFirst.getMonth(),firstWeekSeptFirst.getDate()+1)}
	if (firstWeekSeptFirst.getDay() == 6) {firstWeekMonday = new Date(firstWeekSeptFirst.getFullYear(),firstWeekSeptFirst.getMonth(),firstWeekSeptFirst.getDate()+2)}
			
	while (i<=monthDays){
		var iDay = new Date(year,month,i);
		var weekNumber = parseInt((iDay - firstWeekMonday)/(1000*60*60*24*7))+1
		$('#calendar tbody').add('tr').add('td').addClass('week').html(weekNumber);
		var tr = $(['#calendar tbody tr']);
		var length = tr.length()-1;
		if (length == 1) {
			for(var j = 1;j<firstDay;j++){
					tr.q(length).add('td');
					}
			for(var j = firstDay;j<=7;j++){
					if (j>=6){tr.q(length).add('td').addClass('holyday').html(i++);}
						else{tr.q(length).add('td').html(i++);};
					}
			}else{
				for(var j = 1;j<=7;j++){
					if (i<=monthDays){
						if (j>=6){tr.q(length).add('td').addClass('holyday').html(i++);}
						else{tr.q(length).add('td').html(i++);};
						
						} else{
						tr.q(length).add('td');
						}
					}
				}
		}
		
		if (month == today.getMonth()) {searchDay(today.getDate()).addClass('now');};
		
		$('#buttonLeft').on({"click": function(){
			if(currentMonth == 0){
				currentMonth = 11;
				currentYear--;
			} else{
				currentMonth--;
			}
			createCalendar(currentMonth,currentYear);
		}})
		$('#buttonRight').on({"click": function(){
			if(currentMonth == 11){
				currentMonth = 0;
				currentYear++;
			} else{
				currentMonth++;
			}
			createCalendar(currentMonth,currentYear);
		}})
				
	}
	
 var currentMonth = today.getMonth();
 var currentYear = today.getFullYear();
 createCalendar(today.getMonth(),today.getFullYear());
  
})


