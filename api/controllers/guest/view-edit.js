module.exports = {


  friendlyName: 'View edit',


  description: 'Display "Edit" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/guest/edit'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
