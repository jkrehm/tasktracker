define(['marionette', 'app/views/task'], function (Marionette, TaskView) {

    'use strict';

    var TasksView = Marionette.CollectionView.extend({
        className: 'timers',

        childView: TaskView,

        childEvents: {
            removeTimer: 'removeTimer'
        },

        removeTimer: function (view) {
            this.collection.remove(view.model);
        }
    });

    return TasksView;
});