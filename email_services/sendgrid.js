const
	express = require('express'),
	bodyParser = require('body-parser'),
	nodemailer = require('nodemailer'),
	sgTransport = require('nodemailer-sendgrid-transport');

const router = express.Router();

// Send mail using Sendgrid configurations
router.post('/send', (req, res) => {
	const sendgridPayload = req.body;

	// Set Sendgrid configurations
	var transporter = nodemailer.createTransport(sgTransport(sendgridPayload.configs));

	const mailData = {
		from: sendgridPayload.email.from,
		to: sendgridPayload.email.to,
		subject: sendgridPayload.email.subject,
		text: sendgridPayload.email.message
	};

	// Send mail 
	transporter.sendMail(mailData, function(error, response) {
		if (error) {
			res.send(error);
		} else {
			res.send(response);
		}
	});

});

module.exports = router;