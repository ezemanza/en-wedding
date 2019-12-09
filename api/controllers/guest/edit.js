/* global Guest, Invitation */
module.exports = {


  friendlyName: 'Edit',


  description: 'Edit guest.',


  inputs: {
    id: {
      required: true,
      type: 'number',
      example: 1,
      description: 'Guest id to update'
    },

    emailAddress: {
      required: false,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new guest, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    type: {
      required: true,
      type: 'string',
      example: 'Main',
      description: 'The guest type, main or companion'
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The guest\'s full name.',
    },

    companions: {
      required: false,
      type: ['number'],
      example: [1, 2],
      description: 'Array of companion guest ids'
    },

    preferredLang: {
      required: true,
      type: 'string',
      example: 'en',
      description: 'Guest language for the invitation and webpage'
    }
  },


  exits: {
    success: {
      description: 'Guest updated successfully.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error updating the Guest.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Guest with the provided ID not found.'
    }
  },


  fn: async function (inputs) {
    if (!inputs.id) {
      throw 'error';
    }

    const updatedGuest = await Guest.updateOne({
      id: inputs.id
    })
    .set({
      emailAddress: inputs.emailAddress ? inputs.emailAddress.toLowerCase() : '',
      fullName: inputs.fullName,
      type: inputs.type,
      preferredLang: inputs.preferredLang
    });

    if (!updatedGuest) {
      throw 'notFound';
    } else {
      await Guest.replaceCollection(updatedGuest.id, 'companions')
        .members(inputs.companions || []);

      const guest = await Guest.findOne({ id: inputs.id }).populate('invitation');

      if (guest.invitation) {
        await Invitation.replaceCollection(guest.invitation.id, 'guests')
          .members([...inputs.companions, inputs.id]);
      }
    }

    // All done.
    return;

  }


};
