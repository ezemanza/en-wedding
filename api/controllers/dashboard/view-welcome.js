/* global Invitation */

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
    const invitations = await Invitation.find().populate('confirmedGuests').populate('guests');

    const confirmed = invitations.reduce((acc, invitation) => {
      if (invitation.confirmed) {
        return acc.concat(invitation.confirmedGuests);
      } else {
        return acc;
      }
    }, []);

    const total = invitations.reduce((acc, invitation) => {
      return acc.concat(invitation.guests);
    }, []);

    const pending = invitations.reduce((acc, invitation) => {
      if (invitation.confirmed) {
        return acc;
      } else {
        return acc.concat(invitation.guests);
      }
    }, []);

    const notComing = [];

    invitations.forEach(invitation => {
      if (invitation.confirmed) {
        invitation.guests.forEach(guest => {
          if (guest.invitation !== guest.invitationConfirmed){
            notComing.push(guest);
          }
        });
      }
    });

    return {
      confirmed,
      pending,
      total,
      notComing
    };
  }
};
