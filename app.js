/* importar as configurações do servidor */
var app = require('./config/server');

app.listen(9090, function(){ 
	console.log('Servidor Web rodando na porta 9090')
});