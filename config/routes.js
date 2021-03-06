/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /:uuid?':                    { action: 'view-wedding' },
  'GET /instagram':                 { action: 'view-instagram' },
  'GET /admin':                     { action: 'view-homepage-or-redirect' },
  'GET /admin/welcome/:unused?':    { action: 'dashboard/view-welcome' },

  'GET /admin/signup':              { action: 'entrance/view-signup' },
  'GET /admin/email/confirm':       { action: 'entrance/confirm-email' },
  'GET /admin/email/confirmed':     { action: 'entrance/view-confirmed-email' },

  'GET /admin/login':               { action: 'entrance/view-login' },
  'GET /admin/password/forgot':     { action: 'entrance/view-forgot-password' },
  'GET /admin/password/new':        { action: 'entrance/view-new-password' },

  'GET /admin/account':             { action: 'account/view-account-overview' },
  'GET /admin/account/password':    { action: 'account/view-edit-password' },
  'GET /admin/account/profile':     { action: 'account/view-edit-profile' },

  'GET /admin/guest/create':        { action: 'guest/view-create' },
  'GET /admin/guest/edit/:id':      { action: 'guest/view-edit' },
  'GET /admin/guest':               { action: 'guest/view-list' },
  'GET /admin/guest/:id':           { action: 'guest/view-details' },

  'GET /admin/invitation/create':   { action: 'invitation/view-create' },
  'GET /admin/invitation/edit/:id': { action: 'invitation/view-edit' },
  'GET /admin/invitation/:id':      { action: 'invitation/view-details' },
  'GET /admin/invitation':          { action: 'invitation/view-list' },

  'GET /admin/email':               { action: 'email/view-list' },
  'GET /admin/email/send':          { action: 'email/view-send' },
  'GET /admin/email/resend/:id':    { action: 'email/view-resend' },
  'GET /admin/email/:id':           { action: 'email/view-details' },

  'GET /admin/tables':              { action: 'view-tables' },

  'GET /error':                     { action: 'view-error' },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/admin/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                               { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':                { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':                 { action: 'account/update-profile' },
  'PUT   /api/v1/entrance/login':                         { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                        { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email':  { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':     { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/guest/create':                           { action: 'guest/create' },
  'PUT  /api/v1/guest/edit':                              { action: 'guest/edit' },
  'DELETE  /api/v1/guest/delete':                         { action: 'guest/delete' },
  'POST  /api/v1/invitation/create':                      { action: 'invitation/create' },
  'PUT  /api/v1/invitation/edit':                         { action: 'invitation/edit' },
  'DELETE  /api/v1/invitation/delete':                    { action: 'invitation/delete' },
  'POST /api/v1/invitation/resend-email':                 { action: 'invitation/resend-email' },
  'GET /api/v1/invitation/get':                           { action: 'invitation/get' },
  'POST /api/v1/invitation/confirm':                      { action: 'invitation/confirm' },
  'POST /api/v1/email/send':                              { action: 'email/send' },
  'POST /api/v1/email/resend':                            { action: 'email/resend' },
  'POST /api/v1/invitation/reset-confirmation':           { action: 'invitation/reset-confirmation' },
};
