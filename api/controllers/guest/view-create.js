module.exports = {


  friendlyName: 'View create',


  description: 'Display "Create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/guest/create'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
