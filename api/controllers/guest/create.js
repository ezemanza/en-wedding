/* global Guest */
module.exports = {


  friendlyName: 'Create',


  description: 'Create guest.',


  inputs: {
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
      description: 'New guest was created successfully.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error creating the Guest.'
    },
  },


  fn: async function (inputs) {
    const newGuest = await Guest.create({
      emailAddress: inputs.emailAddress ? inputs.emailAddress.toLowerCase() : '',
      fullName: inputs.fullName,
      type: inputs.type,
      preferredLang: inputs.preferredLang
    })
    .intercept(() => { throw 'error'; })
    .fetch();

    if (inputs.companions.length) {
      _.forEach(inputs.companions, async (companion) => {
        await Guest.addToCollection(newGuest.id, 'companions', companion);
      });

    }

    // All done.
    return;

  }


};
