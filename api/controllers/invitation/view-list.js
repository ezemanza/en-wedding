module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invitation/list'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
