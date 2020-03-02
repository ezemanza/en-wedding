module.exports = {


  friendlyName: 'View instagram',


  description: 'Display "Instagram" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/instagram'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      layout: false
    };

  }


};
