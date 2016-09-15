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

module.exports = middleware;