/* global Guest, Invitation */
module.exports = {


  friendlyName: 'Delete',


  description: 'Delete guest.',


  inputs: {
    id: {
      required: true,
      type: 'number',
      example: 1,
      description: 'Guest id to delete'
    }
  },


  exits: {
    success: {
      description: 'Guest deleted.'
    },
    notFound: {
      description: 'No guest with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    notFoundInvitation: {
      description: 'The invitation of the deleted user could not be found',
      responseType: 'notFound'
    }
  },


  fn: async function ({ id }) {

    var deletedGuest = await Guest.destroyOne({ id });

    if (deletedGuest) {

      if (deletedGuest.invitation && deletedGuest.type === 'main') {
        var deletedInvitation = await Invitation.destroyOne({ id: deletedGuest.invitation });

        if (deletedInvitation) {
          return;
        } else {
          throw 'notFoundInvitation';
        }
      } else {
        return;
      }
    } else {
      throw 'notFound';
    }
  }

};
