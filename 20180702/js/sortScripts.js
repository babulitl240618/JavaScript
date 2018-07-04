var num = [10,80,10,24,50,80,30];

function sortingNum(){
	num.sort(function(a,b){
		return a-b;
	});
	
	document.getElementById("sdemo").innerHTML=num;
}