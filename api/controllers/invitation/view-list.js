/* global Invitation */
module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invitation/list'
    }

  },


  fn: async function () {
    const invitations = await Invitation.find().populate('guests');

    // Respond with view.
    return {
      invitations
    };

  }


};
