define(['jquery', 'lodash', 'app/models/task', 'app/views/task'], function ($, _, TaskModel, TaskView) {

    'use strict';

    var task = new TaskModel();
    var taskView = new TaskView({
        model: task
    });

    taskView.on('removeTimer', function (e) {
        taskView.destroy();
    });

    $('.timers').append(taskView.render().el);
});