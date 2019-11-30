/* global Guest */
module.exports = {


  friendlyName: 'View create',


  description: 'Display "Create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invitation/create'
    }

  },


  fn: async function () {
    const mainGuests = await Guest.find({ type: 'main' }).populate('invitation');

    // Respond with view.
    return {
      guests: mainGuests.filter(g => g.invitation === null) || []
    };

  }


};
