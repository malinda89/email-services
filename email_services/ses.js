const
  express = require('express'),
  aws = require('aws-sdk');

const router = express.Router();

// Send email
router.post('/send', (req, res) => {
  const sesPayload = req.body;

  aws.config = new aws.Config(sesPayload.configs);

  // Load AWS SES
  const ses = new aws.SES({
    apiVersion: '2010-12-01'
  });

  const mailData = {
    Source: sesPayload.email.from,
    Destination: {
      ToAddresses: [sesPayload.email.to]
    },
    Message: {
      Subject: {
        Data: sesPayload.email.subject
      },
      Body: {
        Text: {
          Data: sesPayload.email.message
        }
      }
    }
  };

  ses.sendEmail(mailData, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      console.log('Email sent:');
      console.log(data);
      res.send(data);
    }
  });
});

module.exports = router;