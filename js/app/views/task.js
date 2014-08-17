define(['marionette', 'underscore', 'text!templates/task.html'], function (Marionette, _, taskTmpl) {

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
            'keyup input, change input' : 'syncInputs'
        },

        triggers: {
            'click @ui.remove': 'removeTimer'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:time', this.displayTime);
            this.listenTo(this.model, 'change:running', this.toggleTimer);
        },

        onRender: function () {
            this.displayTime();
        },

        displayTime: function () {
            this.$('.time-ticker').text(this.model.timeString());
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

        syncInputs: function (e) {

            // Update model with form input values
            var $input = $(e.target);
            var name = $input.attr('name');
            var val = $input.val();

            this.model.set(name, val);
        }
    });

    return TaskView;
});