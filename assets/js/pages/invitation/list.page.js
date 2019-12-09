parasails.registerPage('invitation-list', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    cloudError: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
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
    }
  }
});
