/* global Guest, Email */

module.exports = {


  friendlyName: 'Send',


  description: 'Send email.',


  inputs: {
    recipients: {
      required: true,
      type: ['number'],
      example: [1],
      description: 'Id\'s of the guest to send the email to.'
    },

    subject: {
      required: true,
      type: 'string',
      description: 'The subject of the email.'
    },

    template: {
      required: true,
      type: 'string',
      description: 'The HTML template of the email.',
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
  },


  fn: async function (inputs) {
    const { recipients, subject, template } = inputs;

    if (recipients.length === 0) {
      throw 'error';
    }

    const guests = await Guest.find({ id: { in: recipients }}).populate('emailsSent');

    if (guests.length === 0) {
      throw 'error';
    }

    if (template) {
      const util = require('util');

      const newEmail = await Email.create({
        template,
        subject,
        recipients: guests.map(guest => guest.emailAddress).join(', ')
      })
      .intercept(() => { throw 'error'; })
      .fetch();

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
                await Email.addToCollection(newEmail.id, 'sentTo', guest.id);
                await Guest.addToCollection(guest.id, 'emailsSent', newEmail.id);
                sails.log.info(
                  'Background instruction complete:  Email sent (or at least queued):\n'+
                  util.inspect(Object.assign({}, inputs, { recipient: guest.id }),{depth:null})
                );
              }
            });
          }, 5000 * index);
        }
      });
    } else {
      throw 'error';
    }
    // All done.
    return;

  }


};
