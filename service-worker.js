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
                '/offline/assets/images/background.png',
                '/offline/assets/images/booble1.png',
                '/offline/assets/images/booble2.png',
                '/offline/assets/images/diamonds.png',
                '/offline/assets/images/explosion.png',
                '/offline/assets/images/fishes.png',
                '/offline/assets/images/horse.png',
                '/offline/assets/images/mollusk.png',
                '/offline/assets/images/shark.png',
                '/offline/assets/sounds/',
                '/offline/src/GamePlay.js',
                '/offline/src/phaser.min.js',
                '/offline/offline.html'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('se activado');
});

self.addEventListener('fetch', e => {

    // Network with cache fallback
    const respuesta = fetch(e.request).then(res => {

            caches.open('cache-v1.0')
                .then(cache => {
                    // cache.put(e.request, res);
                });

            return res.clone();
        })
        .catch(err => {
            // if (caches.match(e.request)) {
            //     return caches.match(e.request);
            // }

            if (e.request.url.includes('offline')) {
                return caches.match(e.request);
            }

            if (e.request.headers.get('accept').includes('text/html')) {
                console.log('entra');
                return caches.match('/offline/offline.html');
            }
        })

    e.respondWith(respuesta);



    // const respuesta = caches.match(e.request)
    //     .then(res => {
    //         if (res) return res;

    //         // No existe el archivo

    //         return fetch(e.request).then(newResp => {
    //             caches.open('cache-v1.0')
    //                 .then(cache => {
    //                     cache.put(e.request, newResp);
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 });

    //             return newResp.clone();
    //         });
    //     })
    //     .catch(err => {
    //         if (e.request.headers.get('accept').includes('text/html')) {
    //             console.log('entra');
    //             return caches.match('/offline/offline.html');
    //         }
    //     });


});

self.addEventListener('sync', event => {

});