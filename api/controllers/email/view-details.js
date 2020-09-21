/* global Email */
module.exports = {


  friendlyName: 'View details',


  description: 'Display "Details" page.',

  inputs: {
    id: {
      description: 'The ID of the email to look up.',
      type: 'number',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/email/details'
    },

    notFound: {
      description: 'No email with the specified ID was found in the database.',
      responseType: 'notFound'
    }

  },


  fn: async function ({ id }) {

    if (!id) {
      throw 'notFound';
    }

    let email = await Email.findOne({ id }).populate('sentTo');

    if (!email.recipients) {
      email.recipients = email.sentTo.map(guest => guest.emailAddress).join(', ');
    }

    if(!email) {
      throw 'notFound';
    }

    // Respond with view.
    return {
      email
    };

  }


};
