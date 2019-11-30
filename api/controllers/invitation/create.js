/* global Guest, Invitation */
module.exports = {

  friendlyName: 'Create',

  description: 'Create invitation.',

  inputs: {
    mainGuest: {
      required: true,
      type: 'number',
      example: 1,
      description: 'Id of the main guest to send the invitation to.'
    },
  },

  exits: {
    success: {
      description: 'New invitation was created successfully.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error creating the Invitation.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Guest with the provided ID not found.'
    },

    incorrectGuest: {
      responseType: 'badRequest',
      description: 'Expected MAIN guest found COMPANION.'
    },
  },

  fn: async function ({ mainGuest: id = null }) {
    if(!id) {
      throw 'error';
    }

    const uuidv4 = require('uuid/v4');

    const mainGuest = await Guest.findOne({ id: id }).populate('companions');

    const members = [];

    if (!mainGuest) {
      throw 'notFound';
    }

    if (mainGuest.type !== 'main') {
      throw 'incorrectGuest';
    }

    const invitation = await Invitation.create({
      uuid: uuidv4()
    })
    .intercept(() => { throw 'error'; })
    .fetch();

    members.push(mainGuest.id);

    if (mainGuest.companions && mainGuest.companions.length > 0) {
      _.each(mainGuest.companions, (companion) => {
        members.push(companion.id);
      });
    }

    await Invitation.addToCollection(invitation.id, 'guests')
    .members(members);

    console.log('============================');
    console.log({ fullName: mainGuest.fullName,
      uuid: invitation.uuid});
    console.log('============================');


    await sails.helpers.sendTemplateEmail.with({
      to: mainGuest.emailAddress,
      subject: mainGuest.preferredLang === 'en' ? 'Ezequiel & Natalia Wedding invitation' : 'Invitación al casamiento de Ezequiel & Natalia',
      template: `email-invitation-${mainGuest.preferredLang}`,
      layout: false,
      templateData: {
        fullName: mainGuest.fullName,
        uuid: invitation.uuid
      }
    });

    // All done.
    return;

  }


};
