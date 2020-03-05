/**
 * Guest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    firstName: {
      type: 'string',
      description: 'Representation of the guest\'s first name.',
      maxLength: 120,
    },

    lastName: {
      type: 'string',
      description: 'Representation of the guest\'s last name.',
      maxLength: 120,
    },

    fullName: {
      type: 'string',
      description: 'Full representation of the guest\'s name.',
      maxLength: 120,
    },

    emailAddress: {
      type: 'string',
      required: false,
      description: 'Guest\'s email address',
      isEmail: true,
      maxLength: 200,
    },

    type: {
      type: 'string',
      required: true,
      isIn: ['main', 'companion']
    },

    preferredLang: {
      type: 'string',
      required: true,
      isIn: ['en', 'es-AR']
    },

    table: {
      type: 'string',
      required: false
    },

    minor: {
      type: 'boolean',
      description: 'Mark guest age below 5 years',
      required: false
    },

    menu: {
      type: 'string',
      defaultsTo: 'Adulto'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // Add one side of a plural reflexive association
    companions: {
      collection: 'guest',
      description: 'Main Guest\'s companions',
      via: 'mainGuest',
      required: false
    },

    // Add the other side of a plural reflexive association
    mainGuest: {
      collection: 'guest',
      description: 'Companion Guest\'s main guest',
      via: 'companions',
      required: false
    },

    invitation: {
      description: 'Guest\'s invitation',
      model: 'invitation'
    },

    invitationConfirmed: {
      description: 'Guest\'s invitation confirmed',
      model: 'invitation'
    }
  },

};

