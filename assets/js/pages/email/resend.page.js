parasails.registerPage('email-resend', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    guests: [],
    email: {},
    // Form data
    formData: {
      recipients: 'all',
      specific: [],
      subject: '',
      template: ''
    },

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
    if (SAILS_LOCALS.email && SAILS_LOCALS.guests) {
      this.email = SAILS_LOCALS.email;
      this.guests = SAILS_LOCALS.guests;

      this.formData.subject = this.email.subject;
      this.formData.template = this.email.template;
    } else {
      window.location = '/admin/error';
    }
  },

  computed: {
    filteredGuests({ guests }) {
      return guests.filter(guest => guest.emailAddress);
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
      window.location = '/admin/email';
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = {};

      // Validate recipients:
      if(!this.formData.recipients) {
        this.formErrors.recipients = true;
      } else {
        if (this.formData.recipients === 'all') {
          argins.recipients = this.guests.filter(guest => guest.emailAddress).map(guest => guest.id);
        } else if (this.formData.recipients === 'main') {
          argins.recipients = this.guests.filter(guest => guest.type === 'main').map(guest => guest.id);
        } else if (this.formData.recipients === 'specific') {
          if (this.formData.specific.length === 0) {
            this.formErrors.specific = true;
          } else {
            argins.recipients = this.formData.specific;
          }
        }
      }

      // Validate subject:
      if(!this.formData.subject) {
        this.formErrors.subject = true;
      } else {
        argins.subject = this.formData.subject;
      }

      // Validate body:
      if(!this.formData.template) {
        this.formErrors.template = true;
      } else {
        argins.template = this.formData.template;
      }

      argins.id = this.email.id;

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
