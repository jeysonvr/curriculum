if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(function() { console.log("Service Worker Registered"); });
}


self.addEventListener('install', event => {
    // Download offline files
    event.waitUntil(
        caches.open('cache-v1.0').then(function(cache) {
            return cache.addAll([
                '/offline/offline.html'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('se activado');
});

self.addEventListener('fetch', event => {

    const resp = fetch(event.request)
        .then(resp => {
            return resp;
        })
        .catch(err => {

            if (event.request.headers.get('accept').includes('text/html')) {
                console.log('entra');
                return caches.match('/offline/offline.html');
            }

        });

    event.respondWith(resp);
});

self.addEventListener('sync', event => {

});