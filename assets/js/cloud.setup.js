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
        "fullName",
        "companions",
        "preferredLang"
      ]
    },
    "editGuest": {
      "verb": "PUT",
      "url": "/api/v1/guest/edit",
      "args": [
        "id",
        "emailAddress",
        "type",
        "fullName",
        "companions",
        "preferredLang"
      ]
    },
    "deleteGuest": {
      "verb": "DELETE",
      "url": "/api/v1/guest/delete",
      "args": [
        "id"
      ]
    }
  }

});
