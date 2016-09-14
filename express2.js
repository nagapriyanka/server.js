var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send(" Express Demo!..");
});
app.get('/about',function(req,res){
	res.send("About Us Page");
});
app.use(express.static(__dirname));
app.listen(8080);