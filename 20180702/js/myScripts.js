var fruits = ["Banana","Apple","Orange","Mango"];

function sortingFruits(){
	fruits.sort();
	document.getElementById("demo").innerHTML=fruits;
}

function reverseFruits(){
	fruits.reverse();
	document.getElementById("rdemo").innerHTML=fruits;
}