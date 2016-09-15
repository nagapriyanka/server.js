var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
console.log("server started...");
var middleware = require('./middleware1.js');
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);
app.get('/',function(req,res){
	res.send(" Express Demo!..data changed");
});
app.get('/about',function(req,res){
	res.send("About Us Page");
});

app.use(express.static(__dirname));
app.listen(port);
