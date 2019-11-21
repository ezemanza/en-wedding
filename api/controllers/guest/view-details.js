/* global Guest */
module.exports = {


  friendlyName: 'View details',


  description: 'Display "Details" page.',

  inputs: {
    id: {
      description: 'The ID of the guest to look up.',
      type: 'number',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/guest/details'
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

    if (guest.type === 'main') {
      guest = await Guest.findOne({ id }).populate('companions').populate('invitation');
    } else {
      guest = await Guest.findOne({ id }).populate('invitation');
    }

    // Respond with view.
    return {
      guest
    };

  }


};
