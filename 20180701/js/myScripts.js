function myFunction(){
	document.getElementById("demo").innerHTML="Change Paragraph";
}

var person={
	name : "Babul Miah",
	age: 25,
	address: "Jamalpur"
};

function showPersonInfo(){
	document.getElementById("personInfo").innerHTML=person.name+" is "+person.age+" years old and address is "+person.address;
}