/* global Email */
module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/email/list'
    }

  },


  fn: async function () {
    const emails = await Email.find().populate('sentTo');

    emails.forEach(email => {
      if (!email.recipients) {
        email.recipients = email.sentTo.map(guest => guest.emailAddress).join(', ');
      }
    });


    // Respond with view.
    return {
      emails
    };

  }


};
