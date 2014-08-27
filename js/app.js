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

        // Show/hide remove button when checkbox checked/unchecked
        this.listenTo(tasks, 'change:selected', function (task, selected) {
            $('.remove-timers').toggle(tasks.where({selected : true}).length > 0);
        });

        // Show/hide remove button when tasks are removed
        this.listenTo(tasks, 'remove', function (task, selected) {
            $('.remove-timers').toggle(tasks.where({selected : true}).length > 0);
        });

        $('.container').prepend(tasksView.render().el);

        // Add a new task
        $('.add-timer').click(function () {
            tasks.add({});
        });

        // Remove selected tasks
        $('.remove-timers').click(function () {
            var tasksToRemove = tasks.where({selected : true});

            tasks.remove(tasksToRemove);

            $(this).hide();
        });

    });

    return App;
});