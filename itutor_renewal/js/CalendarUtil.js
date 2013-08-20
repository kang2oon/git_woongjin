/**
 * 달력 알고리즘 관련 script.
 *  */

function CalendarUtil() {
	// new !!!
	if( !(this instanceof CalendarUtil) ) {
		return new CalendarUtil();
	};
}

/**
 *	해당월의 날 수를 반환한다 
 * */
CalendarUtil.prototype.getMonToDay = function( yy, mm ) {
	var days = 0;
	switch( mm ){
		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			days = 31;
			break;
		case 4: case 6: case 9: case 11:
			days = 30;
			break;
		case 2:
			if( ( yy%4==0 && yy%100!=0 ) || yy%400==0 ){
				days = 29;
			}else{
				days = 28;
			}
			break;
	}
	return days;
};


/**
 * 1년 1월 1일부터의 날 수를 반환한다.
 * */
CalendarUtil.prototype.getAllDay = function( o ) {
	var year = o.yy-1;
	var days = (year*365) + Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400);
	var i=1;len=o.mm;
	for(;i<len;i+=1){
		days += this.getMonToDay( o.yy, i ); 
	}
	days += o.dd;
	return days;
};

/**
 * '2012-01-01' 형식의 문자열을 해당 날짜가 속한 월의 주간으로 변환 한다.
 * */
CalendarUtil.prototype.getWeekCnt = function( date ) {
	var o =  this.getDateObj( date ),
	o2 = {yy:o.yy, mm:o.mm, dd:1};
	//days = this.getMonToDay( o.yy, o.mm ),
	//fday = this.getDateToWeek( o.yy, o.mm, 1 )-1;
		
	return Math.floor( ( this.getAllDay( o ) - this.getAllDay( o2 ) )/7 ) + 1;
};


/**
 * '2012-01-01' 형식의 문자열을 연, 월, 일 값을 속성으로가진 객체로 반환한다.
 * */ 
CalendarUtil.prototype.getDateObj = function( str ) {
	var arr = str.split('-');
	return { yy:Number( arr[0] ), mm:Number( arr[1] ), dd:Number( arr[2] ) };
};


/**
 * '2012-01-01'형식으로 시작일자와 끝일자를 가지고 날짜동안의 전체 날 수를 반환한다. 
 * */
CalendarUtil.prototype.getTotalDay = function( start, end ) {

	var sd = this.getAllDay( this.getDateObj(start) );
	var ed = this.getAllDay( this.getDateObj(end) );
	var cnt = sd - ed + 1; 
	
	return cnt;
};


/**
 * year, month, day 형식으로 파라미터를 전달하면 그에맞는 요일을 일요일부터 토요일까지 0~6사이의 정수로 반환한다. 
 * */
CalendarUtil.prototype.getDateToWeek = function( yy, mm, dd ){
	return this.getAllDay({ yy:yy, mm:mm, dd:dd })%7;
};


/**
 * '2012-01-01'형식으로 파라미터를 전달하면 그에맞는 요일을 일요일부터 토요일까지 0~6사이의 정수로 반환한다. 
 * */
CalendarUtil.prototype.getStringDateToWeek = function( str ){
	return this.getAllDay( this.getDateObj(str) )%7;
};


