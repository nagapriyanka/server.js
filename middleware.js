var express = require('express');
var app = express();
console.log("server started...");
var middleware = {
	requireAuthentication : function (req,res,next){
		console.log('app is accessed!');
		next();
	},
	logger : function(req,res,next){
		//console.log(req.method);
		console.log('REQUEST: '+req.method +' '+ req.originalUrl + ' --- @ '+new Date().toString());
		next();
	}
}
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);
app.get('/',function(req,res){
	res.send(" Express Demo!..");
});
app.get('/about',function(req,res){
	res.send("About Us Page");
});

app.use(express.static(__dirname));
app.listen(8080);