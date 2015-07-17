chrome.storage.sync.get('preferedThemeStyle', function (options) {
    var stylesheetPathThemeFonts = chrome.extension.getURL('assets/css/readmore-flat-theme-fonts.css');
    $('head').prepend('<link href=' + stylesheetPathThemeFonts + ' rel="stylesheet" type="text/css">');
    var preferedThemeStyle = options['preferedThemeStyle'];
    var stylesheetPathTheme = chrome.extension.getURL('assets/css/readmore-flat-theme-' + preferedThemeStyle + '.min.css');
    $('head').append('<link href=' + stylesheetPathTheme + ' rel="stylesheet" type="text/css">');
});
