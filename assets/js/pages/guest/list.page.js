/* global Cloud */
parasails.registerPage('guest-list', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    cloudError: false,
    search: '',
    guests: []
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    if (SAILS_LOCALS.guests) {
      this.guests = SAILS_LOCALS.guests;
    }
  },

  computed: {
    filteredGuests({ search, guests }) {
      return guests.filter(guest => (guest.fullName.toLowerCase().includes(search.toLowerCase())));
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    details: async function (event, id) {
      event.stopPropagation();
      window.location = `/admin/guest/${id}`;
    },

    deleteGuest: async function (event, id) {
      event.stopPropagation();
      await Cloud['deleteGuest'].with({ id })
        .tolerate(()=>{
          this.cloudError = true;
        });

      if (!this.cloudError) {
        window.location = '/admin/guest';
      }
    },

    createAndSendInvitation: async function (event, id) {
      event.stopPropagation();
      await Cloud['createInvitation'].with({ mainGuest: id })
        .tolerate(()=>{
          this.cloudError = true;
        });

      if (!this.cloudError) {
        window.location = '/admin/guest';
      }
    },

    dismiss: function () {
      this.cloudError = false;
    }
  }
});
