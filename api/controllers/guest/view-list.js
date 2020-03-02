/* global Guest */
module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/guest/list'
    }

  },


  fn: async function () {
    const guests = await Guest.find().populate('companions').populate('invitation');
    // Order users by groups (main with companions followed)
    let orderedGuests= [];

    guests.forEach((guest) => {
      if (guest.type === 'main') {
        orderedGuests.push(guest);
        if (guest.companions.length > 0) {
          guest.companions.forEach((companion) => {
            orderedGuests.push(guests.find(g => g.id === companion.id));
          });
        }
      }
    });

    // Respond with view.
    return {
      guests: orderedGuests
    };

  }


};
