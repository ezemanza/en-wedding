/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable quotes */
  methods: {
    "confirmEmail": {
      "verb": "GET",
      "url": "/admin/email/confirm",
      "args": [
        "token"
      ]
    },
    "logout": {
      "verb": "GET",
      "url": "/api/v1/account/logout",
      "args": []
    },
    "updatePassword": {
      "verb": "PUT",
      "url": "/api/v1/account/update-password",
      "args": [
        "password"
      ]
    },
    "updateProfile": {
      "verb": "PUT",
      "url": "/api/v1/account/update-profile",
      "args": [
        "fullName",
        "emailAddress"
      ]
    },
    "login": {
      "verb": "PUT",
      "url": "/api/v1/entrance/login",
      "args": [
        "emailAddress",
        "password",
        "rememberMe"
      ]
    },
    "signup": {
      "verb": "POST",
      "url": "/api/v1/entrance/signup",
      "args": [
        "emailAddress",
        "password",
        "fullName"
      ]
    },
    "sendPasswordRecoveryEmail": {
      "verb": "POST",
      "url": "/api/v1/entrance/send-password-recovery-email",
      "args": [
        "emailAddress"
      ]
    },
    "updatePasswordAndLogin": {
      "verb": "POST",
      "url": "/api/v1/entrance/update-password-and-login",
      "args": [
        "password",
        "token"
      ]
    },
    "createGuest": {
      "verb": "POST",
      "url": "/api/v1/guest/create",
      "args": [
        "emailAddress",
        "type",
        "firstName",
        "lastName",
        "companions",
        "preferredLang",
        "table",
        "minor",
        "menu"
      ]
    },
    "editGuest": {
      "verb": "PUT",
      "url": "/api/v1/guest/edit",
      "args": [
        "id",
        "emailAddress",
        "type",
        "firstName",
        "lastName",
        "companions",
        "preferredLang",
        "table",
        "minor",
        "menu"
      ]
    },
    "deleteGuest": {
      "verb": "DELETE",
      "url": "/api/v1/guest/delete",
      "args": [
        "id"
      ]
    },
    "createInvitation": {
      "verb": "POST",
      "url": "/api/v1/invitation/create",
      "args": [
        "mainGuest"
      ]
    },
    "editInvitation": {
      "verb": "PUT",
      "url": "/api/v1/invitation/edit",
      "args": [
        "id",
      ]
    },
    "resendInvitation": {
      "verb": "POST",
      "url": "/api/v1/invitation/resend-email",
      "args": [
        "id",
      ]
    },
    "deleteInvitation": {
      "verb": "DELETE",
      "url": "/api/v1/invitation/delete",
      "args": [
        "id"
      ]
    },
    "getInvitation": {
      "verb": "GET",
      "url": "/api/v1/invitation/get",
      "args": [
        "criteria"
      ]
    },
    "confirmInvitation": {
      "verb": "POST",
      "url": "/api/v1/invitation/confirm",
      "args": [
        "guests",
        "message",
        "invitation"
      ]
    },
    "resetConfirmed": {
      "verb": "POST",
      "url": "/api/v1/invitation/reset-confirmation"
    },
    "sendEmail": {
      "verb": "POST",
      "url": "/api/v1/email/send",
      "args": [
        "recipients",
        "subject",
        "template"
      ]
    }
  }

});

