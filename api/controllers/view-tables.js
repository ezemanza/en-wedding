/* global Guest, Invitation */
module.exports = {


  friendlyName: 'View tables',


  description: 'Display "Tables" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/tables'
    }

  },


  fn: async function () {
    const alphabetical = (a, b, prop = 'lastName') => {
      if (a[prop] < b[prop]) {
        return -1;
      }

      if (a[prop] > b[prop]) {
        return 1;
      }

      if (prop === 'firstName') {
        return 0;
      }

      return alphabetical(a, b, 'firstName');
    };

    const assigned = {};
    const unassigned = [];

    const invitations = await Invitation.find().populate('confirmedGuests').populate('guests');

    const confirmed = invitations.reduce((acc, invitation) => {
      if (invitation.confirmed) {
        return acc.concat(invitation.confirmedGuests);
      } else {
        return acc;
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

    const guests = await Guest.find();

    guests.forEach(guest => {
      // Assign user status
      if (confirmed.find(c => c.id === guest.id)) {
        guest.status = 'confirmed';
      } else if (notComing.find(n => n.id === guest.id)) {
        guest.status = 'notComing';
      } else {
        guest.status = 'pending';
      }

      if (guest.table === '0') {
        unassigned.push(guest);
      } else {
        if (assigned[guest.table]) {
          assigned[guest.table].push(guest);
        } else {
          assigned[guest.table] = [ guest ];
        }

        // Order table
        assigned[guest.table] = assigned[guest.table].sort(alphabetical);
      }
    });

    return {
      assigned,
      unassigned: unassigned.sort(alphabetical)
    };
  }
};
