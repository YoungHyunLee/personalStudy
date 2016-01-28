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
	var mother= this;
	
	// Chart 정의.
	var Chart = function(ctx){
		var chart = this;
		this.canvas = ctx.canvas;
		
		this.ctx = ctx;
		
		var sizeCalculate = function(element, whatIsThat){
			if(element['offset'+whatIsThat]){
				return element['offset'+whatIsThat];
			};
		};
		
		var width = this.width = sizeCalculate(ctx.canvas, "Width") || ctx.canvas.width;
		var height = this.height = sizeCalculate(ctx.canvas, "Height") || ctx.canvas.height;
		this.aspectRatio = this.width / this.height;
		
		return this;
	};
	
	// 기본 옵션.
	Chart.defaultOption = {
		// 추후 정의.		
	};
	
	
	
	
	
	
	// BInding!!
	mother.Chart = Chart;
	
}).call(this);



























































































