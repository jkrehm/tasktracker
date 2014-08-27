define(['backbone', 'underscore'], function (Backbone, _) {

    'use strict';

    var Task = Backbone.Model.extend({
        defaults: {
            descr         : '',
            running       : false,
            selected      : false,
            time          : 0,
            timerInterval : 0
        },

        whitelist: ['descr', 'id', 'running', 'time'],

        initialize: function () {
            this.on('change:running', function (model, value) {
                if (!value) {
                    this.stopTimer();
                }
            });
        },

        resetTimer: function () {
            this.set('time', 0);
        },

        set: function (key, val, options) {

            // If time changed and it's a string, then user manually updated
            // so we need to convert it from hh:mm:ss to seconds
            // @todo Handle bad input
            if (key === 'time' && typeof val === 'string') {
                var time = val.split(':');
                val = 0;

                if (time.length === 3) {
                    val += parseInt(time[0], 10) * 60 * 60; // Hours
                    time.shift();
                }

                if (time.length === 2) {
                    val += parseInt(time[0], 10) * 60; // Minutes
                    time.shift();
                }

                val += parseInt(time[0], 10); // Seconds
            }

            Backbone.Model.prototype.set.call(this, key, val, options);
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
        },

        toJSON: function () {
            var attrs = {};

            _.forEach(this.attributes, function (value, key) {

                if (this.whitelist.indexOf(key) > -1) {
                    attrs[key] = value;
                }
            }, this);

            if (typeof attrs.id === 'undefined') {
                attrs.id = _.uniqueId('temp-');
            }

            return attrs;
        }
    });

    return Task;
});