/*
 * 
 * 이제 막 시작이라 지금은 저작권따위...후훗
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
		
		// 기타 메소드 정의.
		this.defaultOption = Chart.defaultOption;
		this.useTypes = Chart.useTypes;
		this.methods = Chart.methods;
		
		return this;
	}
	
	// 기본 옵션.
	Chart.defaultOption = {
		userTheme : 'pinkApple', // default
		themes : {
			pinkApple : {}
		}
	};
	
	// 사용하는 차트 관리.
	Chart.useTypes = function(data, options, chart){
		this.options = options;
		this.chart = chart;
		
		return this.init.call(this, data);
	};
	
	
	// 차트의 메소드 관리.
	Chart.methods = {
		extend : function(receiver, supplier){
			if(Object.assign){
				receiver = receiver ? receiver : {}; 
				return Object.assign(receiver, supplier);	
			} else {
			    Object.keys(supplier).forEach(function(key) {
			        receiver[key] = supplier[key];
			    });
			
			    return receiver;
			};	
		}
	};
	
	
	// BInding!!
	mother.Chart = Chart;
	
}).call(this);



























































































