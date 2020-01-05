module.exports = {


  friendlyName: 'View wedding',


  description: 'Display "Wedding" page.',

  inputs: {
    uuid: {
      description: 'The UUID of the invitation',
      type: 'string',
      required: false
    }
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/wedding'
    }

  },


  fn: async function ({ uuid }) {

    // Respond with view.
    return {
      layout: 'layouts/wedding',
      uuid,
    };

  }


};
