/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'entrance/signup': 'is-production',
  'entrance/view-signup': 'is-production',
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'view-wedding': {
    '*': true
  },
  'view-instagram': true,
  'invitation/get': true,
  'invitation/confirm': true
};
