module.exports = {


  friendlyName: 'Node mailer',


  description: 'Send an email',


  inputs: {
    to: {
      example: 'jane@example.com',
      description: 'Email address of the desired recipient.',
      required: true
    },

    subject: {
      description: 'Subject line for the email.',
      example: 'Welcome, Jane!',
      required: true
    },

    htmlMessage: {
      description: 'The html body of the email.',
      example: '<p>Jane,</p>\n<p>Thanks for joining our community.  If you have any questions, please don\'t hesitate to send them our way.  Feel free to reply to this email directly.</p>\n<br/>\n<p><em>Sincerely,</em></p>\n<p><em>The Management</em></p>',
      required: true
    },
  },


  exits: {

    success: {
      description: 'The email was sent successfully.'
    },

    error: {
      description: 'The email was not sent.'
    }

  },


  fn: async function ({ to, subject, htmlMessage }, exits) {
    const nodemailer = require('nodemailer');
    const { senderEmail, senderEmailPassword } = sails.config.custom;

    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: senderEmail,
        pass: senderEmailPassword
      }
    });

    transport.sendMail({
      from: `"Ezequiel & Natalia" ${senderEmail}`,
      to,
      subject,
      html: htmlMessage
    }, (error) => {
      if (error) {
        return exits.error({ error });
      }

      return exits.success({ success: true });
    });
  }
};
