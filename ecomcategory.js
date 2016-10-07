var express = require('express');
var app = express();
var port = process.env.port ||8080;
var _ = require('underscore');
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var category = [{
	id :1,
	name :"electronic gadgets",
	description :"different brands and types of above 2000 types" 
},
{
	id :2,
	name :"clothing",
	description :{
		kinds :["gents","kids","ladies"],
		type:["formal","casual","fancy"]
	} 
},
{
	id :3,
	name :"computer accessories",
	description :" above 500 items are available" 
}];

app.get('/',function(req,res){

	res.send("E-Commerce...");
});
app.get('/category',function(req,res){

	var filteredcategory = category;
	queryParams= req.query;

	//name
	if(queryParams.hasOwnProperty('name'))
	{
		filteredcategory = _.filter(filteredcategory , function(category){

			return category.name.toLowerCase().indexOf(queryParams.name.toLowerCase()) > -1;
		})
    }
    //desc
    if(queryParams.hasOwnProperty('desc')&& queryParams.desc.length >0)
	{
		filteredcategory = _.filter(filteredcategory , function(category){

			return category.description.toLowerCase().indexOf(queryParams.desc.toLowerCase()) > -1;
		})
    }

	res.json(filteredcategory);
});


app.get('/category/:id',function(req , res)
{
	var categoryId = parseInt(req.params.id);
	var matchedaccount =_.findWhere(category , {id :categoryId});
	if(!matchedaccount)
	{
		return res.status(404).send("NO match Found ! ");
	}
	else
	{
		return res.json(matchedaccount);
	}
});
//adding the category into category array

var id = 4;
app.post('/addcategory',function(req,res){

	var body = req.body;
	if(typeof body !== 'undefined')
	{	
		body.id = id++;
		category.push(body);
		res.send("Another Category added successfully..");
	}
	else
	{
		res.status(404).send("Error in Adding Category !..");
	}
});


app.put('/category/:id',function(req,res){

	var categoryId = parseInt(req.params.id);
	var matchedcategory = _.findWhere(category ,{id :categoryId});
	var body = req.body;
	var updateaccount = {};
	if(!matchedcategory)
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
});


//Delete category
app.delete('/category/:id',function(req,res){

    var categoryId = parseInt(req.params.id);
	var matchedcategory = _.findWhere(category ,{id :categoryId});
	if(!matchedcategory)
	{
		return res.status(404).send("Match Not Found To delete category !");
	}
	else
	{
		category =_.without(category , matchedcategory);
		res.send("Deleted category Successfully");
	}
});
app.listen(port , function(){

	console.log("Ecommerce Server started on port "+ port);
});