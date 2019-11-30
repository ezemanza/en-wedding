parasails.registerPage('invitation-edit', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {
      id: null,
      uuid: '',
      confirmed: false,
      comment: '',
      sent: false,
      guests: [],
      confirmedGuests: []
    },

    mainGuest: {},
    guests: {},

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    if (SAILS_LOCALS.invitation) {
      const {
        id,
        uuid,
        confirmed,
        sent,
        comment,
        guests,
        confirmedGuests
      } = SAILS_LOCALS.invitation;

      this.mainGuest = guests.find(g => g.type === 'main');
      this.guests = guests;

      this.formData.id = id;
      this.formData.uuid = uuid;
      this.formData.confirmed = confirmed;
      this.formData.sent = sent;
      this.formData.comment = comment;
      this.formData.guests = guests.map(g => g.id);
      this.formData.confirmedGuests = confirmedGuests.map(g => g.id);
    } else {
      //window.location = '/admin/error';
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: async function() {
      // Redirect to the guests list.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      window.location = '/admin/invitation';
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate full name:
      if(!argins.mainGuest) {
        this.formErrors.fullName = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },
  }
});
