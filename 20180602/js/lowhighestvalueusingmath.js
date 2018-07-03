var points = [40,10,20,30,50,80];


function findLowestValue(){
	document.getElementById("demo").innerHTML = Math.min.apply(null, points);
}


function findHighestValue(){
	document.getElementById("sdemo").innerHTML = Math.max.apply(null, points);
}