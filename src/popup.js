const today = new Date();
let html = `
<div class="headerParent">
  <table class="header">
    <tr>
      <td>
        <h3 class="headerText" id="infoButton">?</h3>
      </td>
      <td class="center">
        <h3 class="headerText">
          ${today.toLocaleDateString("en-Us", {weekday:'long', month:'long', day:'numeric'}).toUpperCase()}
        </h3>
      </td>
      <td class="right">
        <a href='https://buymeacoff.ee/tommygeiger' target='_blank'>
          <img class="headerImg" src="bmc-logo-no-background.png" alt="Support Me"/>
        </a>
      </td>
    </tr>
  </table>
  <div id="infoDiv" style="display:none;">
    <hr>
    <article>
      <p class="info">
      Trending Google Searches reads Google's Daily Search Trends RSS feed, highlighting Google searches that jumped significantly in traffic over the last 24 hours, with hourly updates. Each trend shows the search query, the number of searches made, and a relevent news article.
      <a href="https://trends.google.com/trends/?geo=US" target="_blank">More Trends</a>
      </p>
    </article>
  </div>
  <hr>
</div>
`;
document.body.insertAdjacentHTML("beforeend", html);
document.getElementById("infoButton").addEventListener("click", toggleInfo);

// const url = new URL("http://localhost:3001")
fetch("https://gtrends-cors-proxy.fly.dev")
.then(response => response.text())
.then(text => {
  const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
  let items = xmlDoc.querySelectorAll("item");
  let html = "";
  let i = 1;

  items.forEach(elem => {
    html +=`
      <article>
        <table>
          <col style="width:5%">
          <col>
          <col style="width:11%"></col>
          <tr class="topRow">
            <td class="center">${i}</td>
            <td>
              <a class="articleTitle" href="https://www.google.com/search?q=${elem.querySelector("title").innerHTML}" target="_blank">${decodeString(elem.querySelector("title").innerHTML)}</a>
            </td>
            <td class="center">${abbreviateNumber(elem.querySelector("approx_traffic").innerHTML)}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <a href="${elem.querySelector("news_item_url").innerHTML} "target="_blank">
                <p class="headline">${decodeString(elem.querySelector("news_item_title").innerHTML)}</p>
              </a>
              <span>${Math.floor(Math.abs(today - new Date(elem.querySelector("pubDate").innerHTML)) / 36e5)}h ago</span>
            </td>
          </tr>
        </table>
      </article>
    `;
    if (i < 20) {
      html +="<hr>"; i++;
    }
  });

  document.body.insertAdjacentHTML("beforeend", html);
});

function abbreviateNumber(string) {
  let number = parseInt(string.replace(/\D/g,""));
  let suffixes = ["", "K", "M", "B", "T"];
  let count = 0;
  while (number >= 1000) {
    number /= 1000;
    count += 1;
  }
  return number.toString() + suffixes[count];
}

function decodeString(string) {
  string = string.replace(/&nbsp;/g, " ");
  string = string.replace(/&amp;#39;/g, "'");
  string = string.replace(/&amp;quot;/g, '"');
  string = string.replace(/&amp;/g, "&");
  string = string.replace(/&lt;/g, "");
  string = string.replace(/\/?b&gt;/g, "");
  string = string.replace(/\s\.\.\./g, "...");
  return string;
}

function toggleInfo() {
  let infoDiv = document.getElementById("infoDiv");
  if (infoDiv.style.display === "none") {
    infoDiv.style.display = "";
  } else {
    infoDiv.style.display = "none";
  }
}
