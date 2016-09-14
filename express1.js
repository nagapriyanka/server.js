var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send(" Express Demo!..");
});
app.listen(8080);
console.log("--------");