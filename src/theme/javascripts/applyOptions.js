// Add Link to Thread in UCP
$(document).ready(function() {
    $('div#header li.ucp ul .sep').before('<li><a href="http://www.readmore.de/forums/91-technik/60-software/139913" title="Readmore Flat Theme Thread">Flat Theme Thread</a></li>');
});

// Forum Arrows Visible
chrome.storage.sync.get('optionForumArrowsVisible', function (options) {
    var optionForumArrowsVisible = options['optionForumArrowsVisible'];
    if (optionForumArrowsVisible == true) {
      var stylesheetPath = chrome.extension.getURL('assets/css/readmore-flat-theme-' + 'forum-arrows-visible' + '.min.css');
      $('head').append('<link href=' + stylesheetPath + ' rel="stylesheet" type="text/css">');
    }
});
