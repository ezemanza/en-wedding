module.exports = {


  friendlyName: 'View read',


  description: 'Display "Read" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invitation/read'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
