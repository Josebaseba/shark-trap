$(function(){

  var InvitationForm = Backbone.View.extend({

    el: $('fieldset[data-control=invitation]'),

    events: {

    },

    initialize: function(){
      if(!this.$el.length) return null;
      this.listenTo(Backbone, 'showInvitationForm', this.showInvitationForm);
      this.listenTo(Backbone, 'hideInvitationForm', this.hideInvitationForm);
    },

    showInvitationForm: function(){
      this.$el.removeClass('hidden');
    },

    hideInvitationForm: function(){
      this.$el.addClass('hidden');
    }

  });

  var invitationForm = new InvitationForm();

});
