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
    // Respond with view.
    return {
      guests
    };

  }


};
