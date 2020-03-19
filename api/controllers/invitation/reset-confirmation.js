/* global Invitation */

module.exports = {

  friendlyName: 'Reset confirmation',


  description: 'Resets all guests confirmation status.',


  exits: {
    success: {
      description: 'Confirmation status was reset.'
    },

    error: {
      responseType: 'badRequest',
      description: 'There was an error resetting the confirmation status.'
    }
  },


  fn: async function () {
    const invitations = await Invitation.find();

    invitations.forEach(async inv => {
      const updatedInvitation = await Invitation.updateOne({ id: inv.id }).set({ confirmed: false });

      if (!updatedInvitation) {
        throw 'notFound';
      }
    });

    // All done.
    return;

  }


};
