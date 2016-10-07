var express = require('express');
var app = express();
var port = process.env.port ||8080;
var products = [
{
	name : "pendrive",
	id : 121,
	description :" HP pendrive of 32 GB ",
	price : 780,
	quantity : 34

},
{
	name : "fasttrack Watch",
	id : 221,
	description :"stylish and stainless steel mens watch",
	price : 1500,
	quantity :5
},

{
	name : "Mens shirt",
	id :321,
	description :"formal and cotton",
	price : 500,
	quantity : 12
}];

app.get('/',function(req,res){

	res.send("E-Commerce...");
});
app.get('/products',function(req,res){

	res.json(products);
});


app.get('/products/:id',function(req , res){

var matchedaccount;
var flag = false;
var productId = parseInt(req.params.id);
products.forEach(function(json){

	if(flag)
	{
		return;
	}
	 if (productId === json.id)
	{
		matchedaccount = json;
		flag = true;
		res.send(matchedaccount);
		
	}
	
});
if(!flag)
{
	
	res.status(404).send("Match Not Found !");

}

});
//adding the product into products array
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/addproduct',function(req,res){

	var body = req.body;	
	if(typeof body !== 'undefined')
	{	
		products.push(body);
		res.send("todo added successfully..");
	}
	else
	{
		res.status(404).send("Error in Adding Product !..");
	}
});

app.listen(port , function(){

	console.log("Ecommerce Server started on port "+ port );


})