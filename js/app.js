define(['jquery', 'backbone', 'marionette', 'app/collections/tasks', 'app/views/tasks', 'backbone.dropbox'],
function ($, Backbone, Marionette, Tasks, TasksView) {

    'use strict';

    var App = new Marionette.Application();

    App.addInitializer(function (options) {

        Backbone.DropboxDatastore.client = options.dropbox;

        var tasks = new Tasks();
        var tasksView = new TasksView({
            collection: tasks
        });

        $('.container').prepend(tasksView.render().el);

        $('.add-timer').click(function () {
            tasks.add({});
        });

    });

    return App;
});