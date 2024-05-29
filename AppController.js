var prefix = window.location.pathname.substr(
    0,
    window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1
);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === 'https:',
};

define(['angular', 'js/qlik'], function (angular, qlik) {
    class QlikObject {
        static SIZES = {
            XSMALL: 'xs',
            SMALL: 's',
            MEDIUM: 'm',
            LARGE: 'l',
            XLARGE: 'xl',
        };

        static SIZE_PX = { xs: 100, s: 200, m: 300, l: 500, xl: 1000 };

        constructor(objectId, elementId, size, customSize) {
            console.log('SIZES: ', QlikObject.SIZES);

            this.objectId = objectId;
            this.elementId = elementId || null;
            this.size = size || QlikObject.SIZES.MEDIUM;
            this.customSize = customSize || null;
        }
    }

    const myQlikObject = new QlikObject('TVZWkLL');

    console.log('myQlikObject: ', myQlikObject);

    // QlikObject.SIZES = {
    //     XSMALL: 'xs',
    //     SMALL: 's',
    //     MEDIUM: 'm',
    //     LARGE: 'l',
    //     XLARGE: 'xl',
    // };

    // QlikObject.SIZE_PX = { xs: 100, s: 200, m: 300, l: 500, xl: 1000 };

    function AppController($scope) {
        this.pageTitle = '';
        this.appId = '';
        this.app = null;
        this.qlikObjects = [];
        this.config = {
            host: window.location.hostname,
            prefix: prefix,
            port: window.location.port,
            isSecure: window.location.protocol === 'https:',
        };

        console.log('yo');
        const appId = '14577065-da6a-4955-9617-bd0cb094b032';
        const qlikObjects = [new QlikObject('TVZWkLL')];

        this.openQlikApp(appId);
        this.setQlikObjects(qlikObjects);
        this.loadQlikObjects(this.app, this.qlikObjects);
    }

    AppController.prototype.openQlikApp = function (appId) {
        console.log('opening qlik app: ', appId);
        this.app = qlik.openApp(appId, this.config);
    };

    AppController.prototype.setQlikObjects = function (qlikObjects) {
        const newQlikObjects = [];

        for (let i = 0; i < qlikObjects.length; i++) {
            if (!qlikObjects[i].elementId) {
                qlikObjects[i].elementId = 'qlik-object-' + i;
            }

            newQlikObjects.push(qlikObjects[i]);
        }

        this.qlikObjects = newQlikObjects;
    };

    AppController.prototype.loadQlikObjects = function (qlikApp, qlikObjects) {
        console.log('loadQlikObjects called');

        for (const qlikObject of qlikObjects) {
            qlikApp.getObject(qlikObject.elementId, this.appId, {
                noInteraction: false,
            });
        }
    };

    var app = angular.module('appControllerModule', []);
    app.controller('AppController', AppController);
});
