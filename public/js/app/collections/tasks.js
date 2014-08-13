define(['backbone', 'app/models/task'], function (Backbone, Task) {

    'use strict';

    var Tasks = Backbone.Collection.extend({
        model: Task,

        initialize: function () {
            var tasks = this;

            // Only one timer should run at a time, so stop all others
            tasks.on('change:running', function (model, running) {

                if (running) {
                    _.each(tasks.where({running : true}), function (task) {

                        if (this !== task) {
                            task.stopTimer();
                        }

                    }, model);
                }
            });
        }
    });

    return Tasks;
});