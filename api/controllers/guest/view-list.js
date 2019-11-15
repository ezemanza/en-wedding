module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/guest/list'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
