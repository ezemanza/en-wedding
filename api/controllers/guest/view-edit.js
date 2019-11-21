/* global Guest */
module.exports = {


  friendlyName: 'View edit',


  description: 'Display "Edit" page.',

  inputs: {
    id: {
      description: 'The ID of the guest to look up.',
      type: 'number',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/guest/edit'
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

    let guest = await Guest.findOne({ id });

    if(!guest) {
      throw 'notFound';
    }

    let availableCompanions = await Guest.find({ type: 'companion' }).populate('mainGuest');

    if (guest.type === 'main') {
      guest = await Guest.findOne({ id }).populate('companions');
      guest.companions = guest.companions.map(companion => companion.id);
      availableCompanions = availableCompanions.filter(c => c.mainGuest.length === 0 || (c.mainGuest[0] && c.mainGuest[0].id === id));
    } else {
      availableCompanions = availableCompanions.filter(c => c.mainGuest.length === 0);
    }

    // Respond with view.
    return {
      guest,
      companions: availableCompanions
    };

  }


};
