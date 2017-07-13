var express = require('express');
var router = express.Router();
var path = require('path');

var configuration = require('../config/config.json');

router.post('/send', function(req, res, next) {
	const nodemailer = require('nodemailer');

	var nombres = toTitleCase(req.body.fullName.toLowerCase());
	var emailA = req.body.emailAddress;
	var mensaje = req.body.message;

	if(nombres===null || nombres==''){
		return res.json({
			success: false,
			message: 'Nombre no puede ser vacío',
		});
	}


	if(emailA===null || emailA==''){
		return res.json({
			success: false,
			message: 'Email no puede ser vacío',
		});
	}

	if(mensaje===null || mensaje==''){
		return res.json({
			success: false,
			message: 'Debe escribir algún mensaje',
		});
	}

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: configuration.user,
	        pass: configuration.password,
	    }
	});

	// setup email data with unicode symbols
	let mailOptions = {
	    from: '"'+nombres+'" <'+emailA+'>', // sender address
	    to: 'hleond20@gmail.com', // list of receivers
	    subject: 'Nuevo mensaje de tu sitio web :D | ' + nombres, // Subject line
	    text: mensaje +  "\n" + emailA, 
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    return res.json({success:true, message:'Me pondré en contacto contigo dentro de poco.'});
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});
});


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = router;