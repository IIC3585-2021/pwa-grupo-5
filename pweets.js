const feed = document.querySelector('main');
const button = document.getElementById('publish')

if ('serviceWorker' in navigator) {
  // caches.keys().then(function(cacheNames) {
  //   cacheNames.forEach(function(cacheName) {
  //     caches.delete(cacheName);
  //   });
  // });
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

button.addEventListener("click", publish);
async function publish() {
    // jfernandez7@uc.cl
    console.log("hola publicando")
    const publisher = document.getElementById('publisher').value;
    const message = document.getElementById('message').value;
    console.log(publisher, message);
//     await fetch("http://localhost:3000/pweets/", {
//     method: "POST",
//     body: JSON.stringify({
//         email: publisher,
//         pweet: message,
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
// .then(response => response.json())
// .then(json => console.log(json));
  }

window.addEventListener('load', e => {
    updatePweets();
});

window.addEventListener('online', () => updatePweets());


async function updatePweets() {
  feed.innerHTML = '';
  const response = await fetch(`http://localhost:3000/pweets`);
  //const response = await fetch(`https://server-web-avanzado.free.beeceptor.com/pweets`);
  const json = await response.json();
  console.log(json);
  feed.innerHTML =
    //json.pweets.map(createPweet).join('\n');
    json.map(createPweet).join('\n');

}

function createPweet(pweet) {
  return `
    <div class="pweet-card">
        <h2>${pweet.email}</h2>
        <p>${pweet.body}</p>
    </div>
  `;
}