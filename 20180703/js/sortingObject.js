var cars=[
	{type:"Volvo", year:2016},
	{type:"BMW", year:2010},
	{type:"SAAB", year:2016}
];

function displaycars(){
	document.getElementById("demo").innerHTML = 
	cars[0].type+" "+cars[0].year+"<br>"+
	cars[1].type+" "+cars[1].year+"<br>"+
	cars[2].type+" "+cars[2].year
}

function sortingCarsByYear(){
	cars.sort(function(a,b){
		return a.year - b.year;
	});
	displaycars();
}