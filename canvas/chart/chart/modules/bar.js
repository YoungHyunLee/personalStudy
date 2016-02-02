/*
 * numbernoriChart
 * 숫자놀이의 차트
 * http://html6.kr
 * 
 * Copyright 2016 Young Hyun Lee
 * Released under the MIT license
 * https://github.com/YoungHyunLee/personalStudy/tree/master/canvas/chart
 */

(function () {
	"use strict";

	var mother = this,
	    Chart = mother.Chart,
	    methods = Chart.methods;

	// test
	
	var barMethods = {
		name : 'Bar',
		defaultOption : Chart.defaultOption,
		init : function(){
			this.draw();
			return this;
		},
		draw: function (){
			
			console.dir(this);
			var ctx = this.chart.ctx;

			ctx.beginPath();
			ctx.moveTo(20, 20);
			ctx.lineTo(20, 100);
			ctx.lineTo(70, 100);
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	};
	// 이 차트를 정의함.
	Chart.useType.extend(barMethods);
	
}).call(this);