module.exports = {


  friendlyName: 'View error',


  description: 'Display "Error" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/error'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
