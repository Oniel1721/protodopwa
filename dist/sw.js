const CACHE_NAME = 'todo-pwa-v1';
const urlsToCache = [
  '/',
  '/bundle.js',
  '/sw.js'
];

// icons by freepik

self.addEventListener('install', (event) =>{
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=> {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  if(navigator.onLine){
    // If have Internet request to the server and then save the answer in chache
    event.respondWith(
      fetch(event.request)
        .then(response=>{
          // console.log(response)

          let responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache =>{
              cache.put(event.request.url, responseClone);
            });
            return response
        })
      )
  }
  else{
    if(event.request.method !== "GET") respondWith({ok:null})
    // otherwise take the answer from the cache
    event.respondWith(
      caches.match(event.request)
        .then(response=>{
          if(response !== undefined) return response
        })
    )
  }
});