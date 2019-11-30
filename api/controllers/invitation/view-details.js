/* global Invitation */
module.exports = {


  friendlyName: 'View details',


  description: 'Display "Details" page.',

  inputs: {
    id: {
      description: 'The ID of the invitation to look up.',
      type: 'number',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/invitation/details'
    },

    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }

  },


  fn: async function ({ id }) {

    if (!id) {
      throw 'notFound';
    }

    let invitation = await Invitation.findOne({ id }).populate('guests').populate('confirmedGuests');

    if(!invitation) {
      throw 'notFound';
    }

    // Respond with view.
    return {
      invitation
    };

  }


};
