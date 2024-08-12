const qouteWindow = document.querySelector(".qouteWindow");
let refresh;
function fetchQuote() {
  fetch("https://api.breakingbadquotes.xyz/v1/quotes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("I am the one who knocks... 404");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((element) => {
        const tweetdata = element.quote + "\n\n-" + element.author;
        let link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetdata
        )}`;
        qouteWindow.innerHTML = `
      <h3>"${element.quote}"</h3>
      <h6>- ${element.author}</h6>
      <button id="refreshButton">Get Another Quote</button>
      <a class="twitter-share-button" target="_blank"
  href="${link}"><button id="tweet" >
Tweet</button></a>
      `;
        refresh = document.querySelector("#refreshButton");
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      qouteWindow.innerHTML = `<h3>Error: ${error.message}</h3>`;
    });
}
fetchQuote();
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "refreshButton") {
    fetchQuote();
  }
});
