var express = require('express');
var app = express();
var port = process.env.port || 8080;
var bodyParser = require('body-parser');
var _ = require('underscore');

app.use(bodyParser.json());
var todos =[

{	
	"id" :1,
    "description": "the first todos-api",
    "completed": false
},

{	
	"id" :2,
    "description": "the second todos-api",
    "completed": false
},

{	
	"id" :3,
    "description": "the third todos-api",
    "completed": false
}]


var id =4;


app.get('/',function(req,res){

	res.send("Todo with Underscore Library ")
});

// Get Todos
app.get('/todos',function(req,res){

	var filterTodos = todos;
	var queryparams = req.query;

	if(queryparams.hasOwnProperty('status'))
	{
			if(queryparams.status === 'true')
			{
				filterTodos = _.where(filterTodos , {completed :true});
			}		
			else if (queryparams.status ==='false')
			{
				filterTodos = _.where(filterTodos , {completed :false});
			}

	}
	res.json(filterTodos);
});

//Gettodo By Id
app.get('/todos/:id',function(req,res){

	var todoid = parseInt(req.params.id);
	//Using _. library functions instead of for each loop

	var matchedTodo  =_.findWhere(todos,{id:todoid});
	
	if(matchedTodo)
	{
		res.send(matchedTodo);
	}
	else
		res.status(404).send ("Matching Todo with id : "+ req.params.id +" Not Found !");
	
});

//Add Todo
app.post('/todos',function(req,res){

//using _.pick
	var body = _.pick(req.body ,'description','completed') ;
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
	
		return res.status(400).send("Error in adding todo ! ");

	}
	
	body.id = id++;
	body.description = body.description.trim(); //removing spaces by trimming
	todos.push(body);
	res.json(body);

});

//DeleteTodo

app.delete('/todos/:id',function(req,res){
	var todoid = parseInt(req.params.id ,10);
	var matchedTodo = _.findWhere(todos,{id:todoid});
	if(!matchedTodo){
		res.status(404).send("Matching not Found With the Given id !");
	}
	else
	{
		todos = _.without(todos,matchedTodo);
		res.json("Deleted Successfully !");
	}

});
//Update Todo 
app.put('/todos/:id',function(req,res){

	var todoid = parseInt(req.params.id ,10);
	var matchedTodo = _.findWhere(todos , {id :todoid});
	var body = _.pick(req.body ,'description','completed');
	
	var validAttributes = {};
	

	if(!matchedTodo)
	{

	   return 	res.status(404).send("Update Fails !.. Matching todo is Not Found !");
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed))
	{
		validAttributes.completed = body.completed;
	}
	else if(body.hasOwnProperty('completed'))
	{
		return res.status(400).send("Invalid Values are passing as Parameters !");
	}
	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length >0)
	{
		validAttributes.description = body.description;
	}
	else if(body.hasOwnProperty('description'))
	{
		return res.status(400).send("Invalid Values !");
	}
	_.extend(matchedTodo ,validAttributes);
	res.json(matchedTodo);
});

app.listen(port ,function(){

	console.log("Todounderscore Server Started on Port : "+port);

});
