define([
    'jquery',
    'dropbox',
    'app',
    'json!config.json'
], function ($, Dropbox, App, cfg) {

    'use strict';

    var dropbox = new Dropbox.Client({key : cfg['dropbox-api']});

    $(function () {

        dropbox.authenticate({}, function authError(error) {

            if (error) {
                return; // @todo
            }

            App(dropbox);
        });
    });
});