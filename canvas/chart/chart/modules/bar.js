/*
 * 
 * 이제 막 시작이라 지금은 저작권따위...후훗
 * 
 * 
 */

(function () {
	"use strict";

	var mother = this,
	    Chart = mother.Chart,
	    methods = Chart.methods;

	// test
	Chart.useTypes.bar = function(data, option){
		
		
		this.bar.draw();
	};
	
	
	var barMethods = {
		draw: function () {
			console.dir(this);
			var ctx = Chart.ctx;

			ctx.beginPath();
			ctx.moveTo(20, 20);
			ctx.lineTo(20, 100);
			ctx.lineTo(70, 100);
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	};
	
	methods.extend(Chart.useTypes.bar, barMethods);
}).call(this);