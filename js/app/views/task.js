define(['marionette', 'underscore', 'text!templates/task.html', 'app/views/remove'], function (Marionette, _, taskTmpl, RemoveView) {

    'use strict';

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    var TaskView = Marionette.ItemView.extend({
        className: 'timer',
        template: _.template(taskTmpl),

        ui: {
            control: '.timer-control',
            remove: '.remove-timer',
        },

        events: {
            'click .start-timer'        : 'startTimer',
            'click .stop-timer'         : 'stopTimer',
            'click @ui.remove'          : 'removeTimer',
            'keyup input, change input' : 'syncInputs'
        },

        modelEvents: {
            'change:running' : 'toggleTimer',
            'change'         : 'syncFields'
        },

        onRender: function () {
            this.$('.time-ticker').val(this.model.timeString());
        },

        toggleTimer: function () {

            // Toggle the start/stop icons
            if (this.model.get('running')) {

                var $start = this.ui.control.find('.start-timer');

                this.ui.control.addClass('spin-right');

                setTimeout(function() {
                    $start.toggleClass('start-timer stop-timer');
                }, 150);

            } else {

                var $stop = this.ui.control.find('.stop-timer');

                this.ui.control.removeClass('spin-right');

                setTimeout(function() {
                    $stop.toggleClass('start-timer stop-timer');
                }, 150);

            }
        },

        startTimer: function () {
            this.model.startTimer();
        },

        stopTimer: function () {
            this.model.stopTimer();
        },

        removeTimer: function () {

            // Are you sure you want to delete this task?
            var removeView = new RemoveView({model : this.model});

            $('body').prepend(removeView.render().el);
            removeView.$el.modal('show');

            // Listen for removal trigger, and pass it along
            removeView.on('removeTimer', function () {
                this.trigger('removeTimer');
            }, this);
        },

        syncFields: function (model, options) {

            // Don't sync fields if the event was triggered by the current view
            if (options.triggeredBy === this) {
                return;
            }

            // Update form input values with model changes
            _.each(model.changed, function (value, name) {

                // Treat time field differently
                if (name === 'time') {
                    value = this.model.timeString();
                }

                this.$('[name="'+name+'"]').val(value);

            }, this);
        },

        syncInputs: _.debounce(function (e) {

            // Update model with form input values
            var $input = $(e.target);
            var name = $input.attr('name');
            var val = $input.val();

            this.model.set(name, val, {triggeredBy : this});

        }, 1000)
    });

    return TaskView;
});