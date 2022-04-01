const rssUrl = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=US`;

fetch(rssUrl)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {

    const items = data.querySelectorAll("item");
    const today = new Date();
    let html = `<h3>${today.toLocaleDateString("en-Us", {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</h3>`;
    let count = 1;

    items.forEach(elem => { 
      html+=`

        <article>

          <span>${count}</span>

          <a href="https://www.google.com/search?q=${elem.querySelector("title").innerHTML}" target="_blank">${elem.querySelector("title").innerHTML}</a>

          <p>${elem.querySelector("approx_traffic").innerHTML} searches</p>

          <a href="${elem.querySelector("news_item_url").innerHTML}" target="_blank">${decodeURIComponent(elem.querySelector("news_item_title").innerHTML)}</a>

          <p>${Math.floor(Math.abs(today - new Date(elem.querySelector("pubDate").innerHTML)) / 36e5)} hrs</p>

          <img src="${elem.querySelector("picture").innerHTML}" alt="image">

        </article>

      `; 
      count++;
    });

    document.body.insertAdjacentHTML("beforeend", html);
  });