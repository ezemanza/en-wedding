parasails.registerPage('invitation-list', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    cloudError: false,
    search: '',
    invitations: [],
    resetting: false,
    loadingReset: false,
    resettingError: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    if (SAILS_LOCALS.invitations) {
      this.invitations = SAILS_LOCALS.invitations;
    }
  },

  computed: {
    filteredInvitations({ search, invitations }) {
      return invitations.filter(invitation => {
        const invitationMain = invitation.guests.find(g => g.type === 'main');
        return invitationMain.fullName.toLowerCase().includes(search.toLowerCase());
      });
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    details: async function (event, id) {
      event.stopPropagation();
      window.location = `/admin/invitation/${id}`;
    },

    deleteInvitation: async function (event, id) {
      event.stopPropagation();
      await Cloud['deleteInvitation'].with({ id })
        .tolerate(()=>{
          this.cloudError = true;
        });

      if (!this.cloudError) {
        window.location = '/admin/invitation';
      }
    },

    resendInvitation: async function (event, id) {
      event.stopPropagation();
      await Cloud['resendInvitation'].with({ id })
        .tolerate(()=>{
          this.cloudError = true;
        });

      if (!this.cloudError) {
        window.location = '/admin/invitation';
      }
    },

    dismiss: function () {
      this.cloudError = false;
    },

    startReset () {
      this.resetting = true;
    },

    cancelReset () {
      this.resetting = false;
      this.resettingError = false;
    },

    resetConfirmation: async function () {
      this.loadingReset = true;
      this.resettingError = false;
      const result = await Cloud.resetConfirmed();
      this.loadingReset = false;

      if (result === 'OK') {
        this.resetting = false;
        window.location = '/admin/invitation';
      } else {
        this.resettingError = true;
      }
    }
  }
});
