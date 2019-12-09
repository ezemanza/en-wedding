/* global Invitation */
module.exports = {


  friendlyName: 'Resend email',


  description: 'Resend invitation email',


  inputs: {
    id: {
      required: true,
      type: 'number',
      example: 1,
      description: 'Id of the invitation to resend the email.'
    },
  },


  exits: {
    success: {
      description: 'Email sent.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error resending the Invitation email.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Invitation with the provided ID not found.'
    }
  },


  fn: async function ({ id }) {
    if(!id) {
      throw 'error';
    }

    const invitation = await Invitation.findOne({ id: id }).populate('guests');

    if (!invitation) {
      throw 'notFound';
    }

    const guest = invitation.guests.find(g => g.type === 'main');
    const companions = invitation.guests.filter(g => g.type === 'companion');

    await sails.helpers.sendTemplateEmail.with({
      to: guest.emailAddress,
      subject: guest.preferredLang === 'en' ? 'We are getting Married! | Ezequiel & Natalia' : 'Nos Casamos! | Ezequiel & Natalia',
      template: `email-invitation-${guest.preferredLang}`,
      layout: false,
      templateData: {
        fullName: guest.fullName,
        uuid: invitation.uuid,
        companions: companions.map(c => c.fullName)
      }
    });

    await Invitation.updateOne({ id: invitation.id })
      .set({
        sent: true
      });

    // All done.
    return;

  }


};
