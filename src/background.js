chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "https://tommygeiger.com/trending-google-searches",
    active: true
  });
});