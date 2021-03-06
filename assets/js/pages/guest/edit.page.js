/* global SAILS_LOCALS */
parasails.registerPage('guest-edit', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {
      id: null,
      firstName: '',
      lastName: '',
      fullName: '',
      emailAddress: '',
      type: '',
      companions: [],
      preferredLang: '',
      table: null,
      minor: null,
      menu: '',
      dni: 0,
      birthDate: ''
    },
    backup: {
      companions: []
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
    if (SAILS_LOCALS.guest) {
      const {
        id,
        firstName,
        lastName,
        fullName,
        emailAddress,
        type,
        companions,
        preferredLang,
        table,
        minor,
        menu,
        dni,
        birthDate
      } = SAILS_LOCALS.guest;

      this.formData.id = id;
      this.formData.firstName = firstName;
      this.formData.lastName = lastName;
      this.formData.fullName = fullName;
      this.formData.emailAddress = emailAddress;
      this.formData.type = type;
      this.formData.companions = companions || [];
      this.formData.preferredLang = preferredLang;
      this.formData.table = table;
      this.formData.minor = minor;
      this.formData.menu = menu;
      this.formData.dni = dni;
      this.formData.birthDate = birthDate;
      this.backup.companions = companions || [];
    } else {
      window.location = '/admin/error';
    }
  },

  watch: {
    'formData.type': function (value) {
      if (value === 'companion') {
        this.backup.companions = this.formData.companions.slice(0);
        this.formData.companions = [];
      } else {
        this.formData.companions = this.backup.companions;
      }
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
      window.location = '/admin/guest';
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate first name:
      if(!argins.firstName) {
        this.formErrors.firstName = true;
      }

      // Validate last name:
      if(!argins.lastName) {
        this.formErrors.lastName = true;
      }

      // Validate email:
      if(argins.type === 'Main' && (!argins.emailAddress || !parasails.util.isValidEmailAddress(argins.emailAddress))) {
        this.formErrors.emailAddress = true;
      }

      // Validate type:
      if(!argins.type) {
        this.formErrors.type = true;
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
