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

    firstName:  {
      required: true,
      type: 'string',
      example: 'Frida',
      description: 'The guest\'s first name.',
    },

    lastName:  {
      required: true,
      type: 'string',
      example: 'Kahlo de Rivera',
      description: 'The guest\'s last name.',
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
    },

    table: {
      required: false,
      type: 'string',
      example: '1',
      description: 'Guest table in the venue'
    },

    minor: {
      required: false,
      type: 'boolean',
      example: true,
      description: 'Guest age below 5'
    },

    menu: {
      required: false,
      type: 'string',
      example: 'Adulto',
      description: 'Guest menu'
    },

    dni: {
      type: 'number',
      required: false,
      example: 34567879,
      description: 'Guest DNI'
    },

    birthDate: {
      type: 'string',
      required: false,
      example: '28/12/1989',
      description: 'Guest birth date'
    },
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
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      fullName: `${inputs.firstName} ${inputs.lastName}`,
      type: inputs.type,
      preferredLang: inputs.preferredLang,
      table: inputs.table,
      minor: inputs.minor,
      menu: inputs.menu,
      dni: inputs.dni,
      birthDate: inputs.birthDate
    });

    if (!updatedGuest) {
      throw 'notFound';
    } else if (updatedGuest.type === 'main') {
      await Guest.replaceCollection(updatedGuest.id, 'companions')
        .members(inputs.companions);

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
