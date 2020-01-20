parasails.registerPage('wedding', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    invitation: {
      error: false,
      pending: true,
      fetched: false,
      confirmed: false
    },
    findInvitationFormData: {
      email: ''
    },
    confirmFormData: {
      guests: [],
      message: ''
    },

    confirmationForm: {
      confirmed: false,
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
    if (SAILS_LOCALS.uuid) {
      // Fetch invitation details to render rsvp form
      this.fetchInvitation(SAILS_LOCALS.uuid);
    } else {
      this.invitation.pending = false;
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    handleGuests: function (id) {
      const isSelected = this.confirmFormData.guests.includes(id);

      if (isSelected) {
        var index = this.confirmFormData.guests.indexOf(id);
        this.confirmFormData.guests.splice(index, 1);
      } else {
        this.confirmFormData.guests.push(id);
      }
    },
    fetchInvitation: async function (criteria) {
      await Cloud['getInvitation'].with({ criteria })
        .tolerate(()=>{
          this.invitation.error = true;
          this.invitation.pending = false;
        })
        .then((invitation) => {
          this.invitation.data = invitation;
          this.invitation.confirmed = invitation.confirmed;
          this.invitation.fetched = true;
          this.invitation.pending = false;
        });
    },
    handleParsingFindForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};
      this.invitation.error = false;

      var argins = {
        criteria: this.findInvitationFormData.email
      };

      // Validate criteria
      if(!argins.criteria || !parasails.util.isValidEmailAddress(argins.criteria)) {
        this.formErrors.email = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },
    invitationFound: function (invitation) {
      this.invitation.data = invitation;
      this.invitation.confirmed = invitation.confirmed;
      this.invitation.fetched = true;
      this.invitation.pending = false;
    },
    handleParsingConfirmForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};
      this.invitation.error = false;

      var argins = this.confirmFormData;

      argins.invitation = this.invitation.data.uuid;

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    invitationConfirmed: function () {
      this.confirmationForm.confirmed = true;
    }
  }
});
