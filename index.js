console.log("==== hello welcome to mark and shin email web service ====");

var nodemailer = require("nodemailer");
var restify = require('restify');

let poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true, // use TLS
    auth: {
        user: "daenerys.targaryen217@gmail.com",
        pass: "pmBw5dlJ-"
    }
};
let transporter = nodemailer.createTransport(poolConfig)

function respond(req, res, next) {
 	console.log(req.params);
	 transporter.sendMail({
        from: 'daenerys.targaryen217@gmail.com',
	    to: ['shincatacutan@gmail.com', 'anthony.escobido@live.com.ph'],
	    subject: 'We are attending!',
	    text: 'Plaintext version of the message',
	    html: '<p>Hi Mark and Shin, <br/><br/>  The following details have been sent from the website. <br/> <br/> Name: '+req.params.name+'<br/> Email: '+req.params.email
	   	 +'<br/> Message: '+req.params.message+'</p> Regards,<br/>the email bot created by *thegoblinsbride*'
	    }, function(error, response){
	        if (error) {
	            console.log(error);
	        } else {
	            console.log("Message sent! ");
	        }
	    });

  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/mailservice/name=:name/email=:email/message=:message', respond);
server.head('/mailservice/name=:name/email=:email/message=:message', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});