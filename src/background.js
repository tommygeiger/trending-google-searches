chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "src/trending-google-searches.html",
    active: true
  });
  chrome.action.setBadgeBackgroundColor({ color: "#4285F4"})
  chrome.action.setBadgeText({text: "!"});
});