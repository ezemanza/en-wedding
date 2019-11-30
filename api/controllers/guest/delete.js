/* global Guest */
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
    }
  },


  fn: async function ({ id }) {

    var deletedGuest = await Guest.destroyOne({ id });

    if (deletedGuest) {
      return;
    } else {
      throw 'notFound';
    }
  }

};