const current_user = {"id":3,"name":"Jose","email":"jfernandez7@uc.cl"}
const profile = document.querySelector('main');

//const user = window.localStorage.getItem('user');

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
    updateProfile();
});

window.addEventListener('online', () => updateProfile());


async function updateProfile() {
  profile.innerHTML = '';

  const response = await fetch(`https://pwitter-19436-default-rtdb.firebaseio.com/users.json`);
  console.log(response)
  const json = await response.json();
  console.log(json)
  const filteredUser = json.filter(usuario => usuario.email === current_user.email);
  console.log(filteredUser)
  const response2 = await fetch(`https://pwitter-19436-default-rtdb.firebaseio.com/pweets.json`);
  const json2 = await response2.json();

  const filteredPweets = json2.filter(pweet => pweet.email === current_user.email);
  console.log(filteredPweets)
  const profileData = {
    user: filteredUser,
    pweets: filteredPweets
  }
  console.log("profiledata:", profileData)
  profile.innerHTML =
  
    createProfile(profileData)
}

function createProfile(info) {
    const myData = `
    <div class="personalInfo">
        <h2>Name: ${info.user[0].name}</h2>
        <h3>Email: ${info.user[0].email}</p>
        <h3>Published pweets: </p>

    </div>
    \n`;
    const pweets = info.pweets.map(createPweet).join('\n'); 
    return myData + pweets
}

function createPweet(pweet) {
  return `
    <div class="pweet-card">
        <p>${pweet.body}</p>
    </div>
  `;
}