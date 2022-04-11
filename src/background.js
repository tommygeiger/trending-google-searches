chrome.runtime.onInstalled.addListener(() => {
  fetchRSS();
  var id = setInterval(fetchRSS, 36e5);
  console.log("Installed, interval set.");
});

chrome.runtime.onStartup.addListener(() => {
  fetchRSS();
  var id = setInterval(fetchRSS, 36e5);
  console.log("Started, interval set.");
});

function fetchRSS() {
  fetch("https://trends.google.com/trends/trendingsearches/daily/rss?geo=US")
  .then(response => response.text())
  .then(text => {
    chrome.storage.local.set({ text });
    chrome.action.setBadgeBackgroundColor({ color: "#519f40"})
    chrome.action.setBadgeText({text: "1"});
  });
}