require.config({
    waitSeconds: 10,
    paths: {
        'backbone' : [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            '../vendor/backbone/backbone.min',
            '../vendor/backbone/backbone'
        ],
        'backbone.dropbox' : [
            '../vendor/backbone.dropboxDatastore/backbone.dropboxDatastore.min',
            '../vendor/backbone.dropboxDatastore/backbone.dropboxDatastore'
        ],
        'bootstrap' : [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap'
        ],
        'dropbox' : [
            '//www.dropbox.com/static/api/dropbox-datastores-1.1-latest',
            'vendor/dropbox-datastores-1.1.0.min'
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
        'marionette' : [
            '../vendor/backbone.marionette/lib/backbone.marionette.min',
            '../vendor/backbone.marionette/lib/backbone.marionette'
        ],
        'text' : [
            '../vendor/requirejs/require-text.min',
            '../vendor/require-plugins/lib/text'
        ],
        'underscore' : [
            '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
            '../vendor/lodash/dist/lodash.min',
            '../vendor/lodash/dist/lodash'
        ],
    },
    shim: {
        'bootstrap' : {
            deps: ['jquery']
        },
        'dropbox' : {
            exports: 'Dropbox'
        },
        'marionette' : {
            deps: ['backbone']
        }
    }
});

require(['main']);