// Saves options to chrome.storage.sync.
function save_options() {
  var themeStyle = document.getElementById('themeStyle').value;
  chrome.storage.sync.set({
    preferedThemeStyle: themeStyle
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Optionen gespeichert.';
    chrome.tabs.reload();
  });
}
document.getElementById('save').addEventListener('click', save_options);

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    preferedThemeStyle: 'light'
  }, function(items) {
    document.getElementById('themeStyle').value = items.preferedThemeStyle;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
