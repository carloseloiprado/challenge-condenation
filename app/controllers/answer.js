/*importar o módulo criptografia de string*/
var sha1 = require('js-sha1');

/*impotar o módulo do file system*/
var fs = require('fs');

//importar módulo de requisição HTTP
var request = require("request");

module.exports.decifrar = function(application, req, res){
	
	//importar apontamento arquivo JSON
	var answerJs = application.config.const;

	fs.readFile(answerJs, 'utf8', function(err, data){
		if (err) {
			var response = {status: 'falha', cifrado: err};
     		res.json(response);
	    } else {
		    var strCifrado 		= 'Nenhum Token foi encontrado';
		    var jsonData 		= JSON.parse(data); // faz o parse para json
		 	var strDecifrado	= '',
		 		resultNumCasas	= 0,
		 		resumo			= '';

		    if (jsonData != null) {
		        strCifrado 	= jsonData.cifrado;	
		        resultNumCasas	= jsonData.numero_casas;
		        somaCasas		= 0;
	        
		        for (var i=0; i<strCifrado.length; i++) {
		        	somaCasas 	 = strCifrado.charAt(i).charCodeAt()-resultNumCasas < 97 ?  26 : 0;
		        	strDecifrado += ( ( isNaN(strCifrado.charAt(i)) && strCifrado.charAt(i).charCodeAt() > 65)  ? String.fromCharCode(strCifrado.charAt(i).charCodeAt()-resultNumCasas+somaCasas).toLowerCase() : strCifrado.charAt(i) )	
				}

				resumo 							= sha1(strDecifrado);		    
			    jsonData.decifrado 				= strDecifrado;
				jsonData.resumo_criptografico 	= resumo;


			    fs.writeFile(answerJs, JSON.stringify(jsonData), function(err) {
			       if (err) {
			         var response = {status: 'falha', resultado: err};
			         res.json(response);
			       } else {
			         var response = jsonData; //{status: 'sucesso', cifrado: strCifrado, decifrado: strDecifrado, resumo_criptografico: resumo};
			         res.json(response);
			       }
			     });
		    }
		    			
	    }
	});
}

module.exports.submeter = function(application, req, res){
	
	//importar apontamento arquivo JSON
	var answerJs = application.config.const;

	fs.readFile(answerJs, 'utf8', function(err, data){
		if (err) {
			var response = {status: 'falha', cifrado: err};
     		res.json(response);
	    } else {
		    var strToken 		= 'Nenhum Token foi encontrado';
		    var jsonData 		= JSON.parse(data); // faz o parse para json
		 	
		    if (jsonData != null) {
		        strToken 	= jsonData.token;			        
		    }

			const options = {
			    method: "POST",
			    url: "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token="+strToken,
			    port: 443,
			    headers: {
			        "Content-Type": "multipart/form-data"
			    },
			    formData : {
			        "answer" : fs.createReadStream(answerJs)
			    }
			};

			request(options, function (error, resp, body) {
			    if(error)
			    	var response = {status: 'error', error: error};					
			    else
			    	var response = body;

			    console.log(body);
			    res.json(response);	
					
			});
	    }
	});

	
}
