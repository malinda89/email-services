const
	express = require('express'),
	bodyParser = require('body-parser'),
	nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport');

const router = express.Router();

// Send mail using SMTP configurations
router.post('/send', (req, res) => {
	const smtpPayload = req.body;

	// Set SMTP configurations
	var transporter = nodemailer.createTransport(smtpTransport(smtpPayload.configs));

	const mailData = {
		from: smtpPayload.email.from,
		to: smtpPayload.email.to,
		subject: smtpPayload.email.subject,
		text: smtpPayload.email.message
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