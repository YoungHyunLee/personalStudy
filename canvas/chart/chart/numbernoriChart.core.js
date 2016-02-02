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
		themes : {
			useTheme : '', // default
			defaults : {}
		}
	};
	
	// 사용하는 차트 관리.
	Chart.useTypes = {};
	
	// 차트의 메소드 관리.
	Chart.methods = {
		// 두 객체를 합칩니다. 
		mixin : function(receiver, supplier){
			if(Object.assign){
				receiver = receiver ? receiver : {}; 
				return Object.assign(receiver, supplier);	
			} else {
			    Object.keys(supplier).forEach(function(key) {
			        receiver[key] = supplier[key];
			    });
			
			    return receiver;
			};	
		},
		// 객체가 가진 프로퍼티를 복제합니다.
		clone : function(obj){
			var cloneObj = {};
			
			for(var name in obj){
				if(obj.hasOwnProperty(name)){
					cloneObj[name] = obj[name];
				};
			};
			return cloneObj;
		},
		// 에러 호출
		errorPrint : function(text){
			console.log(text)
		},
		//
		// 현재 사용 x
		extend : function(receiver, options){
			var referObj = receiver[options.name] = {};
						
			for(var name in options){
				referObj[name] = options[name];				
			};
		}
	};
	
	// 차트 정의
	Chart.useType = function(data, options, chart){
		this.options = options;
		this.chart = chart;
		
		return this.init.call(this, data);
	};
	
	Chart.useType.extend = function(extensions){
		//Chart.useType(data);
		
		var chartUseType = this;
		
		var ChartCopy = function(){
			return chartUseType.apply(this, arguments); 
		};
		
		// 프로토타입 정의.
		ChartCopy.prototype = chartUseType.prototype;
		
		Chart.methods.mixin(ChartCopy.prototype, extensions);
		
		if(extensions.name){
			var chartName = extensions.name;			
			var defalutOpts = Chart.methods.clone(Chart.defaultOption)
			
			Chart.defaultOption[chartName] = Chart.methods.mixin(defalutOpts, extensions.defaultOption);
			Chart.useTypes[chartName] = ChartCopy;
			
			Chart.prototype[chartName] = function(data, options){
				return new ChartCopy(data, options, this);
			};
		} else {
			Chart.methods.errorPrint('name이 없으면 차트를 정의할 수 없으므로, 등록할 수 없습니다.');
		};
		return chartUseType;
	};
	
	
	
	Chart.methods.mixin(Chart.useType.prototype, {
		init : function(){return this;},
		protoMethod : function(){
			console.log('proto 메소드다!!!')
			return this;
		}
	})
	
	// BInding!!
	mother.Chart = Chart;
	
}).call(this);




















































































