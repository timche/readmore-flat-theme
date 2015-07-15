chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.storage.sync.set({
            preferedThemeStyle: 'light'
        });
    }else if(details.reason == "update"){
        chrome.storage.sync.set({
            preferedThemeStyle: 'light'
        })
    }
});
