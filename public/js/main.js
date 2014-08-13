define(['jquery', 'lodash', 'app/collections/tasks', 'app/views/tasks'], function ($, _, Tasks, TasksView) {

    'use strict';

    var tasks = new Tasks();
    var tasksView = new TasksView({
        collection: tasks
    });

    $('.container').prepend(tasksView.render().el);

    $('.add-timer').click(function () {
        tasks.add({});
    });
});