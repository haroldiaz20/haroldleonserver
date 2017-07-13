var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
	var ruta = path.join(__dirname, '/../public', 'index_home.html');
	console.log(ruta);
	fs.readFile(ruta, 'utf8', function (err,data) {
	  	if (err) {
	    	return console.log(err);
	  	}
	  	console.log('esta aqui');
  		var newData = data.toString().replace('__TITLE__', 'Harold Felipe Le&oacute;n D&iacute;az | Desarrollador Web | Trujillo');

      res.writeHeader(200, {"Content-Type": "text/html"});  
      res.write(newData);  
      res.end();
  		/*fs.writeFile (ruta, newData, function(err) {
                if (err){
                	 throw err;
             	}
                console.log('completed');
                res.sendFile(ruta);
        });*/
	});
   
});

module.exports = router;
