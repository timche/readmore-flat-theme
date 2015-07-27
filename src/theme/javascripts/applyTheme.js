chrome.storage.sync.get('preferedThemeStyle', function (options) {
    var preferedThemeStyle = options['preferedThemeStyle'];
    var stylesheetPath = chrome.extension.getURL('assets/css/readmore-flat-theme-' + preferedThemeStyle + '.min.css');
    $('head').prepend('<link href=' + stylesheetPath + ' rel="stylesheet" type="text/css">');
});
