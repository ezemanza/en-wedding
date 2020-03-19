/* global Guest */

module.exports = {

  friendlyName: 'View send',


  description: 'Display "Send" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/email/send'
    }

  },


  fn: async function () {

    const guests = await Guest.find().populate('companions').populate('invitation');

    const alphabetical = (a, b, prop = 'lastName') => {
      if (a[prop] < b[prop]) {
        return -1;
      }

      if (a[prop] > b[prop]) {
        return 1;
      }

      if (prop === 'firstName') {
        return 0;
      }

      return alphabetical(a, b, 'firstName');
    };

    // Respond with view.
    return {
      guests: guests.sort(alphabetical)
    };

  }


};
