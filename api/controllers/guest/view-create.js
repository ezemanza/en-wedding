/* global Guest */
module.exports = {


  friendlyName: 'View create',


  description: 'Display "Create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/guest/create'
    }

  },


  fn: async function () {

    const availableCompanions = await Guest.find({ type: 'companion' }).populate('mainGuest');

    // Respond with view.
    return {
      companions: availableCompanions.filter(c => c.mainGuest.length === 0)
    };

  }


};
