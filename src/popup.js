const rssUrl = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=US`;
const today = new Date();

fetch(rssUrl)
  .then(response => response.text())
  .then(text => new DOMParser().parseFromString(text, "text/xml"))
  .then(xmlDoc => {

    let items = xmlDoc.querySelectorAll("item");
    let html = "";
    let i = 1;

    html += `
      <div class="headerParent">
        <h2 class="header">
          <img class="inlineImg" src="/assets/48.png">
          ${today.toLocaleDateString("en-Us", {weekday:'long', year:'numeric', month:'long', day:'numeric'})}
          <a href='https://ko-fi.com/G2G2BYHPN' target='_blank'>
            <img class="inlineImg floatRight" src="/assets/kofi.png" alt="Buy Me a Coffee"/>
          </a>
        </h2>
      </div>
      `;

    items.forEach(elem => {
      html +=`
        <article>
          <div class="tableParent">
            <table>
              <col style="width:5%">
              <col>
              <col style="width:10%">
              <tr class="topRow">
                <td class="centered">${i}</td>
                <td>
                  <a class="link title" href="https://www.google.com/search?q=${elem.querySelector("title").innerHTML}" target="_blank">${decodeString(elem.querySelector("title").innerHTML)}</a>
                </td>
                <td class="centered">${abbreviateNumber(elem.querySelector("approx_traffic").innerHTML)}</td>
              </tr>
              <tr class="bottomRow">
                <td></td>
                <td>
                  <a class="link" href="${elem.querySelector("news_item_url").innerHTML} "target="_blank">${decodeString(elem.querySelector("news_item_title").innerHTML)}</a>
                  <span>${Math.floor(Math.abs(today - new Date(elem.querySelector("pubDate").innerHTML)) / 36e5)}h ago</span>
                </td>
                <td class="centered">searches</td>
              </tr>
            </table>
          </div>
          <div class="pictureParent">
            <img src="${elem.querySelector("picture").innerHTML}" alt="picture">
            <div class="caption">${elem.querySelector("picture_source").innerHTML}<div>
          </div>
        </article>
        <hr>
      `; 
      i++;
    });

    document.body.insertAdjacentHTML("beforeend", html);
  });


  function abbreviateNumber(string) {
    let number = parseInt(string.replace(/\D/g,""));
    let suffixes = ["", "K", "M", "B", "T"];
    let count = 0;
    while(number >= 1000) {
      number /= 1000;
      count += 1;
    }
    return number.toString() + suffixes[count] + "+";
  }


  function decodeString(string) {
    string = string.replace(/&nbsp;/g, " ");
    string = string.replace(/&amp;#39;/g, "'");
    string = string.replace(/&amp;quot;/g, '"');
    return string;
  }