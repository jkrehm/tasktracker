define(['backbone', 'lodash'], function (Backbone, _) {

    'use strict';

    var TaskModel = Backbone.Model.extend({
        defaults: {
            id            : _.uniqueId('task_'),
            running       : false,
            time          : 0,
            timerInterval : 0
        },

        resetTimer: function () {
            this.set('time', 0);
        },

        startTimer: function () {
            var self = this;

            var timerInterval = setInterval(function() {
                var time = self.get('time') + 1;

                self.set('time', time);
            }, 1000);

            this.set('timerInterval', timerInterval);
            this.set('running', true);
        },

        stopTimer: function () {
            clearInterval(this.get('timerInterval'));
            this.set('running', false);
        },

        timeString: function () {
            var time = this.get('time');

            var hours   = Math.floor(time / 3600);
            var minutes = Math.floor((time % 3600) / 60);
            var seconds = Math.floor(time % 60);

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return hours + ':' + minutes + ':' + seconds;
        }
    });

    return TaskModel;
});