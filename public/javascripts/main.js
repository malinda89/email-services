$(function() {

  // Load SES configurations from local storage
  var sesConfigs = JSON.parse(localStorage.sesConfigs || '{}');
  if (!$.isEmptyObject(sesConfigs)) {
    $('#access_key').val(sesConfigs.accessKeyId);
    $('#secret_key').val(sesConfigs.secretAccessKey);
    $('#region').val(sesConfigs.region);
  }

  // Load SMTP configurations from local storage
  var smtpConfigs = JSON.parse(localStorage.smtpConfigs || '{}');
  if (!$.isEmptyObject(smtpConfigs)) {
    $('#smtp_host').val(smtpConfigs.host);
    $('#smtp_port').val(smtpConfigs.port);
    $('#smtp_username').val(smtpConfigs.auth.user);
    $('#smtp_password').val(smtpConfigs.auth.pass);
  }

  // Load Sendgrid configurations from local storage
  var sendgridConfigs = JSON.parse(localStorage.sendgridConfigs || '{}');
  if (!$.isEmptyObject(sendgridConfigs)) {
    $('#sendgrid_key').val(sendgridConfigs.auth.api_key);
  }

  // Return email data
  var getEmailData = function() {
    return {
      from: $('#from').val(),
      to: $('#to').val(),
      subject: $('#subject').val(),
      message: $('#message').val()
    };
  };

  // Send email via AWS SES
  $('#ses_send').on('click', function(e) {
    e.preventDefault();

    var sesPayload = {
      configs: {
        accessKeyId: $('#access_key').val(),
        secretAccessKey: $('#secret_key').val(),
        region: $('#region').val()
      },
      email: getEmailData()
    };

    localStorage.setItem('sesConfigs', JSON.stringify(sesPayload.configs));

    $.ajax({
      type: 'POST',
      url: '/ses/send',
      contentType: 'application/json',
      data: JSON.stringify(sesPayload),
      success: function(res) {
        console.log(res);
      }
    });
  });

  // Send email via SMTP
  $('#smtp_send').on('click', function(e) {
    e.preventDefault();

    var smtpPayload = {
      configs: {
        host: $('#smtp_host').val(),
        port: $('#smtp_port').val(),
        auth: {
          user: $('#smtp_username').val(),
          pass: $('#smtp_password').val()
        }
      },
      email: getEmailData()
    };

    localStorage.setItem('smtpConfigs', JSON.stringify(smtpPayload.configs));

    $.ajax({
      type: 'POST',
      url: '/smtp/send',
      contentType: 'application/json',
      data: JSON.stringify(smtpPayload),
      success: function(res) {
        console.log(res);
      }
    });
  });

  // Send email via Sendgrid
  $('#sendgrid_send').on('click', function(e) {
    e.preventDefault();

    var sendgridPayload = {
      configs: {
        auth: {
          api_key: $('#sendgrid_key').val()
        }
      },
      email: getEmailData()
    };

    localStorage.setItem('sendgridConfigs', JSON.stringify(sendgridPayload.configs));

    $.ajax({
      type: 'POST',
      url: '/sendgrid/send',
      contentType: 'application/json',
      data: JSON.stringify(sendgridPayload),
      success: function(res) {
        console.log(res);
      }
    });
  });

});