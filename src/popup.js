const rssUrl = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=US`;
fetch(rssUrl)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {

    const items = data.querySelectorAll("item");
    const today = new Date();
    let html =`
      <h2 class="centered">${today.toLocaleDateString("en-Us", {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</h3>
      `;
    let count = 1;

    items.forEach(elem => { 
      html +=`
        <hr>
        <article>
          <div>
            <table>
              <tr class="topRow">
                <td>${count}</td>
                <td class="title">${elem.querySelector("title").innerHTML}</td>
                <td></td>
                <td class="centered">${shortenNumber(elem.querySelector("approx_traffic").innerHTML)}</td>
              </tr>
              <tr class="bottomRow">
                <td></td>
                <td>
                  <a class="link" href="${elem.querySelector("news_item_url").innerHTML} "target="_blank">${decodeURIComponent(elem.querySelector("news_item_title").innerHTML)}</a>
                </td>
                <td class="noWrap">${Math.floor(Math.abs(today - new Date(elem.querySelector("pubDate").innerHTML)) / 36e5)}h ago</td>
                <td class="centered">
                  searches
                </td>
              </tr>
            </table>
          </div>
          <div>
            <img src="${elem.querySelector("picture").innerHTML}" alt="image">
          </div>
        </article>
      `; 
      count++;
    });

    document.body.insertAdjacentHTML("beforeend", html);
  });


  function shortenNumber(string) {
    let number = parseInt(string.replace(/\D/g,''));
    let suffixes = ["", "K", "M", "B", "T"];
    let count = 0;
    while(number >= 1000) {
      number /= 1000;
      count += 1;
    }
    return number.toString() + suffixes[count] + "+";
  }