define(['jquery', 'backbone', 'app/collections/tasks', 'app/views/tasks', 'backbone.dropbox'],
function ($, Backbone, Tasks, TasksView) {

    function App (dropbox) {

        Backbone.DropboxDatastore.client = dropbox;

        var tasks = new Tasks();
        var tasksView = new TasksView({
            collection: tasks
        });

        $('.container').prepend(tasksView.render().el);

        $('.add-timer').click(function () {
            tasks.add({});
        });
    }

    return App;
});