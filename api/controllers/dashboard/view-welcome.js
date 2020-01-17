/* global Invitation, Guest */

module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function () {
    const invitations = await Invitation.find().populate('confirmedGuests');

    return {
      guests: invitations.reduce((acc, invitation) => {
        return acc.concat(invitation.confirmedGuests);
      }, [])
    };
  }
};
