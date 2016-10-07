var express = require('express');
var app = express();
var port = process.env.port ||8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var _ = require('underscore');

var products = [
{
	name : "pendrive",
	id : 1,
	description :" HP pendrive of 32 GB ",
	price : 780,
	quantity : 34

},
{
	name : "fasttrack Watch",
	id : 2,
	description :"stylish and stainless steel mens watch",
	price : 1500,
	quantity :5
},

{
	name : "Mens shirt",
	id :3,
	description :"formal and cotton",
	price : 500,
	quantity : 12
}];

app.get('/',function(req,res){

	res.send("E-Commerce...");
});
app.get('/products',function(req,res){

	//For QueryString

	var filteredProducts = products;
	queryParams= req.query;
	//name
	if(queryParams.hasOwnProperty('name') && queryParams.name.length >0)
	{
		filteredProducts = _.filter(filteredProducts , function(product){

			return product.name.toLowerCase().indexOf(queryParams.name.toLowerCase()) > -1;
		})
    }
    //desc
    if(queryParams.hasOwnProperty('desc')&& queryParams.desc.length >0)
	{
		filteredProducts = _.filter(filteredProducts , function(product){

			return product.description.toLowerCase().indexOf(queryParams.desc.toLowerCase()) > -1;
		})
    }
    //price
    if(queryParams.hasOwnProperty('min') && !queryParams.hasOwnProperty('max'))
    {   
    	filteredProducts = _.filter(filteredProducts,function(product){
    		return product.price >= queryParams.min;
    	})
    	
    }
    else if(queryParams.hasOwnProperty('max') && !queryParams.hasOwnProperty('min'))
    {   
    	filteredProducts = _.filter(filteredProducts,function(product){
    		return product.price <= queryParams.max;
    	})
    	
    }

    else if(queryParams.hasOwnProperty('min') && queryParams.hasOwnProperty('max'))
	{
		filteredProducts = _.filter(filteredProducts , function(product){

			return product.price >= queryParams.min  && product.price <= queryParams.max;
		});
    }
    //Quantity
    if(queryParams.hasOwnProperty('quantity') && !queryParams.hasOwnProperty('quantity'))
    {   
    	filteredProducts = _.filter(filteredProducts,function(product){
    		return product.quantity >= queryParams.quantity;
    	})
    	
    }
    
  	res.json(filteredProducts);
});


app.get('/products/:id',function(req , res)
{
	var productId = parseInt(req.params.id);
	var matchedaccount = _.findWhere(products ,{id :productId});
	if(!matchedaccount)
	{
		res.status(404).send("Match Not Found !");
	}
	else
	{
		res.json(matchedaccount);
	}

});

//Adding the product into products array

var id = 4;
app.post('/addproducts',function(req,res){

	var body = req.body;	
	if(typeof body !== 'undefined')
	{	
		
		if(!body.hasOwnProperty('name') || !body.hasOwnProperty('description') || !body.hasOwnProperty('price') || !body.hasOwnProperty('quantity'))
		{
			res.status(404).send("Some Values are Missing !");
		}
		else
		{

			if(!_.isString(body.name) || body.name.trim().length == 0)
			{
				res.status(400).send(" Invalid values For name");
			}
			else
			{	
				body.id = id ++;
				products.push(body);
				res.send("Product added successfully..");
			}
		}
	}
	else
	{
		res.status(404).send("Error in Adding Product !..");
	}
});

//update product Data

app.put('/products/:id',function(req,res){

	var productId = parseInt(req.params.id);
	var matchedProduct = _.findWhere(products ,{id :productId});
	
	//var body = _.pick(req.body , 'name','description','price','quantity');
	var body = req.body;
	var updateaccount = {};
	if(!matchedProduct)
	{
		 return res.status(404).send("Match Not Found !");
	}
	if(body.hasOwnProperty('name') && _.isString(body.name) && body.name.trim().length >0)
	{
		updateaccount.name = body.name;
	}
	else if(body.hasOwnProperty('name')){
		return res.status(400).send("Invalid values name!");
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length >0)
	{
		updateaccount.description = body.description;
	}
	else if(body.hasOwnProperty('description')){
		return res.status(400).send("Invalid values description!");
	}

	if(body.hasOwnProperty('price') && _.isNumber(body.price))
	{
		updateaccount.price = body.price;
	}
	else if(body.hasOwnProperty('price')){
		return res.status(400).send("Invalid values price!");
	}

	if(body.hasOwnProperty('quantity') && _.isNumber(body.quantity))
	{
		updateaccount.quantity = body.quantity;
	}
	else if(body.hasOwnProperty('quantity')){
		return res.status(400).send("Invalid values quantity!");
	}
	_.extend(matchedProduct ,updateaccount);
	 res.json(matchedProduct);

});
//Delete product
app.delete('/products/:id',function(req,res){

    var productId = parseInt(req.params.id);
	var matchedProduct = _.findWhere(products ,{id :productId});
	if(!matchedProduct)
	{
		return res.status(404).send("Match Not Found To delete Product !");
	}
	else
	{
		products =_.without(products , matchedProduct);
		res.send("Deleted Product Successfully");
	}
});

app.listen(port , function(){

	console.log("Ecommerce Server started on port "+ port );


});