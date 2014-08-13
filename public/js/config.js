require.config({
    waitSeconds: 10,
    paths: {
        'backbone' : [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            '../vendor/backbone/backbone.min',
            '../vendor/backbone/backbone'
        ],
        'bootstrap' : [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap'
        ],
        'jquery' : [
            '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
            '../vendor/jquery/dist/jquery.min',
            '../vendor/jquery/dist/jquery'
        ],
        'json' : [
            '../vendor/requirejs/require-json.min',
            '../vendor/require-plugins/src/json'
        ],
        'lodash' : [
            '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
            '../vendor/lodash/dist/lodash.min',
            '../vendor/lodash/dist/lodash'
        ],
        'marionette' : [
            '../vendor/backbone.marionette/lib/backbone.marionette.min',
            '../vendor/backbone.marionette/lib/backbone.marionette'
        ],
        'text' : [
            '../vendor/requirejs/require-text.min',
            '../vendor/require-plugins/lib/text'
        ],
    },
    shim: {
        'backbone' : {
            deps: ['jquery', 'lodash']
        },
        'marionette' : {
            deps: ['backbone']
        }
    }
});

define('underscore', function () {
    return require('lodash');
});

require(['main']);