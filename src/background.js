chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "https://tommygeiger.com/trending-google-searches",
    active: true
  });
  chrome.action.setBadgeBackgroundColor({ color: "#4285F4"})
  chrome.action.setBadgeText({text: "!"});
});