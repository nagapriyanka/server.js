var person ={

	name : "priyanka",
	age : 20
}
function update(args)
{
	args.age = 21;
	args.year = 2016;
}
console.log(person);
update(person);
console.log("After Updating");
debugger;
console.log(person);