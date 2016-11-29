const
  express = require('express'),
  bodyParser = require("body-parser"),
  dotenv = require('dotenv'),
  sesRoutes = require('./email_services/ses'),
  smtpRoutes = require('./email_services/smtp'),
  sendgridRoutes = require('./email_services/sendgrid');

const
  app = express(),
  router = express.Router();

dotenv.load();

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use(express.static('public'))
  .use('/', express.static('public/views'))
  .use('/', router)
  .use('/ses', sesRoutes)
  .use('/smtp', smtpRoutes)
  .use('/sendgrid', sendgridRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log('Server started...');
});