define(['marionette', 'lodash', 'text!templates/task.html'], function (Marionette, _, taskTmpl) {

    'use strict';

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    var TaskView = Marionette.ItemView.extend({
        tagName: 'div',
        template: _.template(taskTmpl),

        ui: {
            control: '.timer-control',
            remove: '.remove-timer',
        },

        events: {
            'click .start-timer': 'startTimer',
            'click .stop-timer': 'stopTimer',
        },

        triggers: {
            'click @ui.remove': 'removeTimer'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:time', this.displayTime);
        },

        onRender: function () {
            this.displayTime();
        },

        displayTime: function () {
            this.$('.time-ticker').text(this.model.timeString());
        },

        startTimer: function () {
            var $start = this.ui.control.find('.start-timer');

            this.ui.control.addClass('spin-right');

            setTimeout(function() {
                $start.toggleClass('start-timer stop-timer');
            }, 150);

            this.model.startTimer();
        },

        stopTimer: function (e) {
            var $stop = this.ui.control.find('.stop-timer');

            this.ui.control.removeClass('spin-right');

            setTimeout(function() {
                $stop.toggleClass('start-timer stop-timer');
            }, 150);

            this.model.stopTimer();
        }
    });

    return TaskView;
});