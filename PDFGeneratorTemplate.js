/*
 * Basic reponsive mashup template
 * @owner Jan Iverson Eligio (janiverson.eligio.ctr@us.navy.mil)
 */

/*
 *  Fill in host and port for Qlik engine
 */
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

require.config({
    baseUrl:
        (config.isSecure ? 'https://' : 'http://') +
        config.host +
        (config.port ? ':' + config.port : '') +
        config.prefix +
        'resources',
    paths: {
        appControllerModule: '../extensions/PDFGeneratorTemplate/AppController',
    },
});

require(['js/qlik'], function (qlik) {
    // Initialize AppController
    require(['angular', 'appControllerModule'], function (angular) {
        angular.bootstrap(document, ['appControllerModule', 'qlik-angular']);
    });

    qlik.setOnError(function (error) {
        $('#popupText').append(error.message + '<br>');
        $('#popup').fadeIn(1000);
    });
    $('#closePopup').click(function () {
        $('#popup').hide();
    });

    /****** CONSTANTS ******/
    const navbarTitleEl = $('#navbar-title');
    const exportButtonTitleEl = $('#export-button-title');

    const SIZE = {
        XSMALL: 'xs',
        SMALL: 's',
        MEDIUM: 'm',
        LARGE: 'l',
        XLARGE: 'xl',
    };
    const SIZE_PX = { xs: 100, s: 200, m: 300, l: 500, xl: 1000 };
    /***********************/

    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /************* CHANGE THESE VARIABLES **************/

    var navbarText = 'USINDOPACOM J4 Debrief';
    var exportButtonText = 'Export to PDF';

    var appId = '14577065-da6a-4955-9617-bd0cb094b032';

    // Objects will appear on mashup in order of this array
    var qlikObjects = [
        // { objectId: 'TVZWkLL', size: SIZE.SMALL, customSize: null },
        // { objectId: 'TVZWkLL', size: SIZE.SMALL, customSize: null },
    ];

    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/

    // Change customzied text
    navbarTitleEl.text(navbarText);
    exportButtonTitleEl.text(exportButtonText);

    //callbacks -- inserted here --
    //open apps -- inserted here --
    var app = qlik.openApp(appId, config);

    app.on('error', function (error) {
        console.log('ERROR opening app [', appId, ']:', error);
    });

    app.on('warning', function (warning) {
        console.log('WARNING opening app [', appId, ']:', warning);
    });

    app.on('closed', function (closed) {
        console.log('CLOSING app [', appId, ']: ', closed);
    });

    //get objects -- inserted here --
    for (var i = 0; i < qlikObjects.length; i++) {
        const qlikObject = qlikObjects[i];

        console.log('adding QV: ', qlikObject.objectId);

        var elementId = 'QV' + String(i).padStart(i < 10 ? 1 : 0, '0');
        const classNames = ['qvobject', 'qlik_object'].join(' ');

        const elementHeight = qlikObject.customSize
            ? qlikObject.customSize
            : `${SIZE_PX[qlikObject.size]}`;

        const styles = [`height: ${elementHeight}px`].join('; ');

        $('main.content').append(
            `<div id="${elementId}" class="${classNames}" style="${styles}"></div>`
        );

        // Change height of object
        console.log(
            `Adjusting height for: #${elementId} .qv-object-content-container`,
            $(`#${elementId} .qv-object-content-container`)
        );

        // Fetch qlik object and inserts into div
        app.getObject(elementId, qlikObject.objectId, { noInteraction: true });
    }

    //create cubes and lists -- inserted here --
});
