var points = [40,10,20,30,50,80];


function findLowestValue(){
	points.sort(function(a,b){
		return a-b;
	});

	document.getElementById("demo").innerHTML = points[0];
}


function findHighestValue(){
	points.sort(function(a,b){
		return b-a;
	});
	document.getElementById("sdemo").innerHTML = points[0];
}