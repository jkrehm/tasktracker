define(['marionette', 'underscore', 'text!templates/remove.html', 'bootstrap'], function (Marionette, _, removeTmpl) {

    'use strict';

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    var RemoveView = Marionette.ItemView.extend({
        className: 'modal fade',
        template: _.template(removeTmpl),

        ui: {
            remove: '.btn-remove'
        },

        events: {
            'click @ui.remove' : 'removeTimer',
            'hidden.bs.modal'  : 'destroy'
        },

        onRender: function () {
            this.$el.modal(); // Instantiate the modal dialog
        },

        removeTimer: function () {
            this.$el.modal('hide');
            this.trigger('removeTimer');
        }
    });

    return RemoveView;
});