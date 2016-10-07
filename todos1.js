var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.port || 8080 ;
var todos =[];
var todoid = 1;
app.use(bodyParser.json());

app.get('/',function(req, res){
	
	res.send('Todo-api root');
});
app.get('/todos',function(req,res){
	res.json(todos);
});
app.get('/todos/:id',function(req,res){

	//var todoid = req.params.id;
	var todoid = parseInt(req.params.id);
	var matchedTodo = false;
	var gettodo;
	todos.forEach(function(todo){

		if(matchedTodo)
		{
			return;
		}
		else
		{
			if(todoid === todo.id)
			//if(todoid == todo.id)
			{
				gettodo = todo;
				matchedTodo = true;
			}

			
		}

	})
	if(matchedTodo)
	{
		res.send(gettodo);
	}
	else
		res.status(404).send ("Matching Todo with id : "+ req.params.id +" Not Found !");
	//res.send("asking for particular id of todos : "+req.params.id )
});


//adding a new todo

app.post('/todos',function(req,res){

	var body = req.body;
	body.id = todoid++;
	todos.push(body);
	//res.send("todo added successfully");
	res.json(body);	
});

app.listen(port,function(){
	console.log(" Todo-api server started on port number "+ port);
})