chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.storage.sync.set({
            preferedThemeStyle: 'light'
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf('www.readmore.de') == 0) {
    chrome.pageAction.show(tabId);
  }
});
