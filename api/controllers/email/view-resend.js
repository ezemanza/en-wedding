/* global Email, Guest */
module.exports = {


  friendlyName: 'View resend',


  description: 'Display "Resend" page.',

  inputs: {
    id: {
      description: 'The ID of the email to look up.',
      type: 'number',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/email/resend'
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

    if(!email) {
      throw 'notFound';
    }

    if (!email.recipients) {
      email.recipients = email.sentTo.map(guest => guest.emailAddress).join(', ');
    }

    const guests = await Guest.find();

    const alphabetical = (a, b, prop = 'lastName') => {
      if (a[prop] < b[prop]) {
        return -1;
      }

      if (a[prop] > b[prop]) {
        return 1;
      }

      if (prop === 'firstName') {
        return 0;
      }

      return alphabetical(a, b, 'firstName');
    };

    // Respond with view.
    return {
      email,
      guests: guests.sort(alphabetical)
    };

  }


};
