define(['backbone', 'underscore'], function (Backbone, _) {

    'use strict';

    var Task = Backbone.Model.extend({
        defaults: {
            descr         : '',
            running       : false,
            time          : 0,
            timerInterval : 0
        },
/*
        attrWhiteList: ['descr', 'time'],

        save: function (attrs, options) {

            options || (options = {});

            if (this.attrWhiteList) {
                whitelisted = _.pick(this.attributes, this.attrWhiteList);
            } else {
                whitelisted = this.attributes;
            }

            options.data = JSON.stringify(whitelisted);


        },
*/
        resetTimer: function () {
            this.set('time', 0);
        },

        startTimer: function () {
            var self = this;

            // Update the time every second
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

            // Output the time in HH:MM:SS format
            return hours + ':' + minutes + ':' + seconds;
        }
    });

    return Task;
});