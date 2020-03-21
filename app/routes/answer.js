module.exports = function(application){
	application.get('/decifra', function(req, res){
		application.app.controllers.answer.decifrar(application, req, res);
	});

	application.post('/decifra', function(req, res){
		application.app.controllers.answer.submeter(application, req, res);
	});
}