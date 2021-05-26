const feed = document.querySelector('main');

if ('serviceWorker' in navigator) {
  caches.keys().then(function(cacheNames) {
    cacheNames.forEach(function(cacheName) {
      caches.delete(cacheName);
    });
  });
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
    updatePweets();
});

window.addEventListener('online', () => updatePweets());


async function updatePweets() {
  feed.innerHTML = '';
  const response = await fetch(`http://localhost:3000/pweets/`);
  const json = await response.json();
  feed.innerHTML =
    json.map(createPweet).join('\n');
}

function createPweet(pweet) {
  return `
    <div class="pweet">
        <h2>${pweet.email}</h2>
        <p>${pweet.body}</p>
    </div>
  `;
}