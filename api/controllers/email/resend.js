/* global Guest, Email */
module.exports = {


  friendlyName: 'Resend',


  description: 'Resend email.',


  inputs: {
    id: {
      required: true,
      type: 'number',
      example: 1,
      description: 'Id of the email to resend'
    },

    recipients: {
      required: true,
      type: ['number'],
      example: [1],
      description: 'Id\'s of the guest to send the email to.'
    }
  },


  exits: {
    success: {
      description: 'Email sent.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error sending the email.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Email with the provided ID not found.'
    }
  },


  fn: async function (inputs) {
    const { recipients, id } = inputs;

    if (recipients.length === 0 || !id) {
      throw 'error';
    }

    const guests = await Guest.find({ id: { in: recipients }}).populate('emailsSent');

    if (guests.length === 0) {
      throw 'error';
    }

    const email = await Email.findOne({
      id: inputs.id
    }).populate('sentTo');

    if (!email) {
      throw 'notFound';
    } else {
      const { subject, template } = email;

      let recipients = email.recipients;

      if(!recipients) {
        recipients = email.sentTo.map(guest => guest.emailAddress).join(', ');
      }

      await Email.update({ id: inputs.id }).set({
        recipients: `${ email.recipients ? `${email.recipients}, ` : ''}${guests.map(guest => guest.emailAddress).join(', ')}`
      });

      const util = require('util');

      guests.forEach((guest, index) => {
        if (!guest.emailAddress) {
          throw 'error';
        }

        const isToAddressConsideredFake = Boolean(guest.emailAddress.match(/@example\.com$/i));

        const dontActuallySend = (
          sails.config.environment === 'test' || isToAddressConsideredFake
        );

        if (dontActuallySend) {
          sails.log(
            'Skipped sending email, either because the "To" email address ended in "@example.com"\n'+
            'or because the current \`sails.config.environment\` is set to "test".\n'+
            '\n'+
            'But anyway, here is what WOULD have been sent:\n'+
            '-=-=-=-=-=-=-=-=-=-=-=-=-= Email log =-=-=-=-=-=-=-=-=-=-=-=-=-\n'+
            'To: '+guest.emailAddress+'\n'+
            'Subject: '+subject+'\n'+
            '\n'+
            'Body:\n'+
            template+'\n'+
            '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
          );
        } else {
          setTimeout(async () => {
            var deferred = sails.helpers.mailgun.sendHtmlEmail.with({
              htmlMessage: template.replace(/(?:\r\n|\r|\n)/g, '<br>'),
              to: guest.emailAddress,
              subject: subject
            });

            deferred.exec(async (err)=>{
              if (err) {
                sails.log.error(
                  'Background instruction failed:  Could not deliver email:\n'+
                  util.inspect(Object.assign({}, inputs, { recipient: guest.id }),{depth:null})+'\n',
                  'Error details:\n'+
                  util.inspect(err)
                );
              } else {
                await Email.addToCollection(email.id, 'sentTo', guest.id);
                await Guest.addToCollection(guest.id, 'emailsSent', email.id);
                sails.log.info(
                  'Background instruction complete:  Email sent (or at least queued):\n'+
                  util.inspect(Object.assign({}, inputs, { recipient: guest.id }),{depth:null})
                );
              }
            });
          }, 5000 * index);
        }
      });
    }


    // All done.
    return;

  }


};
