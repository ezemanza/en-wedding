/* global Invitation, Guest */
module.exports = {


  friendlyName: 'Get',


  description: 'Get invitation.',


  inputs: {
    criteria: {
      required: false,
      type: 'string',
      example: '',
      description: 'UUID of the invitation or the main guest email address'
    }
  },


  exits: {
    success: {
      description: 'Invitation found.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error fetching the Invitation.'
    },

    notFound: {
      responseType: 'badRequest',
      description: 'Invitation not found with the given criteria.'
    }
  },


  fn: async function ({ criteria }) {
    let invitation;

    if (!criteria) {
      throw 'error';
    }

    const isEmail = criteria.indexOf('@') > -1;

    if (isEmail) {
      const guest = await Guest.findOne({ emailAddress: criteria }).populate('invitation');

      if (guest) {
        invitation = await Invitation.findOne({ id: guest.invitation.id }).populate('guests');
      }

    } else {
      invitation = await Invitation.findOne({ uuid: criteria }).populate('guests');
    }

    if (!invitation) {
      throw 'notFound';
    }

    // All done.
    return invitation;

  }


};
