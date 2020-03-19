/* global Email */
module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/email/list'
    }

  },


  fn: async function () {
    const emails = await Email.find().populate('sentTo');

    // TODO: order by created date

    // Respond with view.
    return {
      emails
    };

  }


};
