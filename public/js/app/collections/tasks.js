define(['backbone', 'app/models/task', 'backbone.dropbox'], function (Backbone, Task) {

    'use strict';

    var Tasks = Backbone.Collection.extend({

        model: Task,
        dropboxDatastore: new Backbone.DropboxDatastore('tasks'),

        initialize: function () {
            var tasks = this;

            // Sync collection
            this.dropboxDatastore.syncCollection(this);
            this.fetch();

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

            // Save changes
            this.on('change', _.debounce(function (model) {
                model.save();
            }, 500));

            // Remove the task
            tasks.on('remove', function (model) {
                model.destroy();
            });
        }
    });

    return Tasks;
});