/**
 * Invitation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    uuid: {
      type: 'string',
      example: '7010e565-06d0-48c0-a9f1-98b57806dfc7',
      description: 'Invitation UUID',
      required: true
    },

    confirmed: {
      type: 'boolean',
      description: 'Invitation confirmed or not',
      required: false,
      defaultsTo: false
    },

    comment: {
      type: 'string',
      description: 'Invitation comment upon confirmation',
      required: false,
      defaultsTo: ''
    },

    sent: {
      type: 'boolean',
      description: 'Invitation sent to Guest\'s or not',
      required: false,
      defaultsTo: false
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    confirmedGuests: {
      collection:'guest',
      description: 'Invitation confirmed for the Guest\'s in this association',
      via: 'invitationConfirmed'
    },

    guests: {
      collection:'guest',
      description: 'Guests in the invitation',
      via: 'invitation'
    }
  },

};

