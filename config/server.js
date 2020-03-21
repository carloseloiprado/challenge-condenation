/*importar o modulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/*importar o modulo do body parser */
var bodyParser = require('body-parser');

/* iniciar o objeto do express */
var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/const.js')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;