/*
 * 
 * 이제 막 시작이라 지금은 저작권따위...후훗
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


(function(){
	"use strict";
	
	
	// 전역 변수. 
	var Chart = function(ctx){
		var _this = this;
		this.canvas = ctx.canvas;
		
		this.ctx = ctx;
		
		var sizeCalculate = function(element, whatIsThat){
			if(element['offset'+whatIsThat]){
				return element['offset'+whatIsThat]
			};		
		};
		
		var width = this.width = sizeCalculate(ctx.canvas, "Width") || ctx.canvas.width;
		var height = this.height = sizeCalculate(ctx.canvas, "Height") || ctx.canvas.height;
		this.aspectRatio = this.width / this.height;
		
		return this;
	}
	
	
	
	// 원래 여기는 아니지만 일단...
	var myCanvas = document.getElementById('canvas').getContext('2d');
	var myChart = new Chart(myCanvas)
	
	
	
})()



























































































