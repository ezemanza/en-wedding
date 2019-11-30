/* global Invitation*/
module.exports = {


  friendlyName: 'Delete',


  description: 'Delete invitation.',


  inputs: {
    id: {
      required: true,
      type: 'number',
      example: 1,
      description: 'Invitation id to delete'
    }
  },


  exits: {
    success: {
      description: 'Guest deleted.'
    },
    notFound: {
      description: 'No guest with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function ({ id }) {

    var deletedInvitation = await Invitation.destroyOne({ id });

    if (deletedInvitation) {
      return;
    } else {
      throw 'notFound';
    }

  }


};
