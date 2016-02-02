/*
 * numbernoriChart
 * 숫자놀이의 차트
 * http://html6.kr
 * 
 * Copyright 2016 Young Hyun Lee
 * Released under the MIT license
 * https://github.com/YoungHyunLee/personalStudy/tree/master/canvas/chart
 */

(function(){
	"use strict";
	
	
	
	// 실행
	var ctx = document.getElementById('canvas').getContext('2d');
	var myChart = new Chart(ctx);
	myChart.Bar('data', {
		myOpt : '내 옵션이지롱!!!'
	});
	
	console.dir(myChart);
	
})();



























































































