/* global Invitation */
module.exports = {


  friendlyName: 'Edit',


  description: 'Edit invitation.',


  inputs: {
    id: {
      required: true,
      type: 'number',
      example: 1,
      description: 'ID of the invitation to update'
    },
    uuid: {
      required: true,
      type: 'string',
      example: '',
      description: 'UUID of the invitation to update'
    },
    confirmed: {
      required: true,
      type: 'boolean',
      example: true,
      description: 'If true invitation is confrmed'
    },
    comment: {
      required: false,
      type: 'string',
      example: 'A comment',
      description: 'Confirmation comment from the main guest'
    },
    sent: {
      required: true,
      type: 'boolean',
      example: true,
      description: 'If true the invitatiojn email has been sent'
    },
    guests: {
      required: true,
      type: ['number'],
      example: [1,2,3],
      description: 'ID\'s of the invited guests'
    },
    confirmedGuests: {
      required: true,
      type: ['number'],
      example: [1,2,3],
      description: 'ID\'s of the confirmed guests'
    }
  },


  exits: {
    success: {
      description: 'Invitation updated successfully.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error updating the Invitation.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Invitation with the provided ID not found.'
    }
  },


  fn: async function (inputs) {

    if (!inputs.id) {
      throw 'error';
    }

    const updatedInvitation = await Invitation.updateOne({
      id: inputs.id
    })
    .set({
      uuid: inputs.uuid,
      confirmed: inputs.confirmed,
      comment: inputs.comment,
      sent: inputs.sent
    });

    if (!updatedInvitation) {
      throw 'notFound';
    } else {
      await Invitation.replaceCollection(updatedInvitation.id, 'guests')
        .members(inputs.guests || []);

      await Invitation.replaceCollection(updatedInvitation.id, 'confirmedGuests')
        .members(inputs.confirmedGuests || []);
    }

    // All done.
    return;

  }


};
