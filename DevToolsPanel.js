chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "DevTools.js"
});

document.querySelector("button").addEventListener("click", function() {
  chrome.devtools.inspectedWindow.eval("console.log('s')");
});

