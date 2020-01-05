/* global Invitation, Guest */
module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm invitation.',


  inputs: {
    guests: {
      required: false,
      type: ['string'],
      default: [],
      example: [''],
      description: 'IDs of the users to confirm the invitation'
    },
    message: {
      required: false,
      type: 'string',
      default: '',
      example: '',
      description: 'Message for the confirmation'
    },
    invitation: {
      required: true,
      type: 'string',
      example: '',
      description: 'UUID of the invitation to confirm'
    }
  },


  exits: {
    success: {
      description: 'Invitation confirmed.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error confirming the Invitation.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Invitation not found with the given criteria.'
    }
  },


  fn: async function (inputs) {

    if (!inputs.invitation) {
      throw 'error';
    }

    const updatedInvitation = await Invitation.updateOne({
      uuid: inputs.invitation
    })
    .set({
      confirmed: true,
      comment: inputs.message
    });

    if (!updatedInvitation) {
      throw 'notFound';
    } else {
      await Invitation.replaceCollection(updatedInvitation.id, 'confirmedGuests')
          .members(inputs.guests || []);
    }

    // All done.
    return;

  }


};
